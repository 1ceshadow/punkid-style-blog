// GLM-4.7-Flash API integration
// Note: process.env.API_KEY is injected by the environment.

const API_KEY = process.env.API_KEY;
const API_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/chat/completions';
const MODEL = 'glm-4.7-flash';

export const generatePostSummary = async (postContent: string): Promise<string> => {
  try {
    if (!API_KEY) {
      return "Error: API key is not configured.";
    }

    const buildMessages = (mode: 'default' | 'strict') => [
      {
        role: "system",
        content: mode === 'strict'
          ? "只输出最终摘要（2-3句话），不要编号、不要解释、不要额外文本。"
          : "你是一个专业的技术编辑。请只输出最终摘要，不要输出思考过程或分析。"
      },
      {
        role: "user",
        content: `请为以下博客内容生成一个简洁、吸引人的摘要（2-3句话），突出核心技术要点或主要观点：\n\n${postContent}`
      }
    ];

    console.log('Calling GLM-4.7-Flash API...');

    const requestSummary = async (mode: 'default' | 'strict') => {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: buildMessages(mode),
          max_tokens: 256,
          temperature: 0.8,
          top_p: 0.9,
          response_format: { type: "text" },
          thinking: { type: "disabled" }
        })
      });

      console.log('GLM API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("GLM API error response:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          return { error: `错误: ${errorData.error?.message || errorData.message || '无法连接到AI服务'}` };
        } catch {
          return { error: `错误: HTTP ${response.status} - ${errorText.substring(0, 100)}` };
        }
      }

      const data = await response.json();
      console.log('GLM API response data:', data);

      return { data, summary: extractSummaryFromResponse(data) };
    };

    const firstAttempt = await requestSummary('default');
    if (firstAttempt.error) {
      return firstAttempt.error;
    }

    if (firstAttempt.summary) {
      return firstAttempt.summary.trim();
    }

    const hasReasoning = Boolean(firstAttempt.data?.choices?.[0]?.message?.reasoning_content);
    if (hasReasoning) {
      const retryAttempt = await requestSummary('strict');
      if (retryAttempt.error) {
        return retryAttempt.error;
      }
      if (retryAttempt.summary) {
        return retryAttempt.summary.trim();
      }
    }

    console.error('No content in response:', firstAttempt.data);
    return "无法生成摘要，请稍后重试。";
  } catch (error) {
    console.error("Error generating summary:", error);
    return `连接错误: ${error instanceof Error ? error.message : '未知错误'}`;
  }
};

const extractSummaryFromResponse = (data: any): string | null => {
  const choice = data?.choices?.[0];
  if (!choice) {
    return null;
  }

  const message = choice.message ?? choice.delta ?? choice;
  const content = message?.content ?? message?.text ?? choice?.content;

  if (!content) {
    return null;
  }

  if (Array.isArray(content)) {
    const joined = content
      .map((part) => {
        if (typeof part === 'string') {
          return part;
        }
        if (typeof part?.text === 'string') {
          return part.text;
        }
        if (typeof part?.content === 'string') {
          return part.content;
        }
        return '';
      })
      .join('')
      .trim();

    return joined.length > 0 ? joined : null;
  }

  if (typeof content === 'string') {
    return content.length > 0 ? content : null;
  }

  return null;
};
