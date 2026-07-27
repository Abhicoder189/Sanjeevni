import { GoogleGenAI } from "@google/genai";
import systemPrompt from "../prompts/systemPrompt.js";

export async function analyzeSymptoms(message, language) {

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
${systemPrompt}

Preferred Language:
${language}

User Symptoms:
${message}
`;

  const response = await ai.models.generateContent({
    model: "gemma-4-31b-it",
    contents: prompt,
  });

  const raw = response.text;

  const json = raw.match(/\{[\s\S]*\}/);

  if (!json) {
    throw new Error("Invalid JSON returned by Gemma.");
  }

  return JSON.parse(json[0]);
}