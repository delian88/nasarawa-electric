
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the Agro-Electric Advisor for 'Nasarawa Electric Pole', a leading electrical company in Nasarawa State, Nigeria. 
Your goal is to provide expert advice on rural electrification, solar-powered irrigation, farm power infrastructure, and agro-processing electrical setups.
Be professional, helpful, and knowledgeable about the specific agricultural context of Nigeria (especially Nasarawa).
Recommend Nasarawa Electric Pole's services (pole installation, wiring, transformer maintenance, and sustainable energy) where appropriate.
Keep answers concise but technically sound.`;

export const getAgroElectricAdvice = async (userPrompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return response.text || "I'm sorry, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing some technical difficulties. Please call our office directly for urgent agro-electric consultations.";
  }
};
