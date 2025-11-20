
import { GoogleGenAI } from "@google/genai";

// Safely retrieve the key (Vite replaces process.env.API_KEY with a string literal)
const apiKey = process.env.API_KEY;

// Initialize the client only if the key exists to prevent runtime errors on load
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateWittyEulogy = async (name: string, cause: string): Promise<string> => {
  if (!ai) {
    return `Here lies ${name}. They died of ${cause}. (API Key missing - running in offline mode)`;
  }

  try {
    const prompt = `
      Write a witty, cynical, and slightly dark humorous eulogy for "${name}" who died from "${cause}".
      The tone should be like a 8-bit RPG NPC or a bored funeral director.
      Target length: 75 words. 
      Break it into distinct sentences. Do not be overly offensive, just satirical.
      If the cause is abstract (e.g. "My motivation"), personify it.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Rest in Peace. Words fail us, literally.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The spirits are silent today (API Error). Rest in peace anyway.";
  }
};

export const generateTombstoneInscription = async (): Promise<string> => {
    if (!ai) return "404: Life Not Found.";

    try {
        const prompt = "Write a funny, 10-word maximum epitaph for a random gravestone in a pixel art game.";
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Here lies a bug.";
    } catch (e) {
        return "Connection to the afterlife timed out.";
    }
}
