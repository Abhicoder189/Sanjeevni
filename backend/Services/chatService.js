import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function chatWithGemma(history, message) {
  const response = await ai.models.generateContent({
    model: "gemma-4-31b-it",

    contents: [
      {
        role: "user",
        parts: [
          {
            text: `
You are a safe medical triage assistant.

Never diagnose diseases.

Only explain the previous triage result.

If symptoms worsen,
recommend seeing a doctor.

Conversation History:

${history}

User:
${message}
            `,
          },
        ],
      },
    ],
  });

  return response.text;
}