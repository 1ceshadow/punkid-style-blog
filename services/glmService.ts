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

    const messages = [
      {
        role: "user",
        content: `请为以下博客内容生成一个简洁、吸引人的摘要（2-3句话），突出核心技术要点或主要观点：\n\n${postContent}`
      }
    ];

    console.log('Calling GLM-4.7-Flash API...');

    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        messages: messages,
        max_tokens: 512,
        temperature: 0.8,
        top_p: 0.9
      })
    });

    console.log('GLM API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GLM API error response:", errorText);
      try {
        const errorData = JSON.parse(errorText);
        return `错误: ${errorData.error?.message || errorData.message || '无法连接到AI服务'}`;
      } catch {
        return `错误: HTTP ${response.status} - ${errorText.substring(0, 100)}`;
      }
    }

    const data = await response.json();
    console.log('GLM API response data:', data);
    
    const summary = data.choices?.[0]?.message?.content;
    if (!summary) {
      console.error('No content in response:', data);
      return "无法生成摘要，请稍后重试。";
    }
    
    return summary.trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    return `连接错误: ${error instanceof Error ? error.message : '未知错误'}`;
  }
};
