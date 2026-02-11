import { GoogleGenAI } from "@google/genai";

// Initialize the API client
// Note: process.env.API_KEY is injected by the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePostSummary = async (postContent: string): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a helpful editorial assistant. 
      Please provide a concise, engaging summary (max 3 sentences) of the following blog post content. 
      Focus on the key technical takeaways or the main argument.
      
      Content:
      ${postContent}
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Unable to generate summary.";
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error: Could not connect to AI service. Please check your API key.";
  }
};
