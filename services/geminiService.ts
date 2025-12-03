import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "@/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});


export const getProductRecommendations = async (
  query: string,
  availableProducts: Product[]
): Promise<{ recommendedIds: string[]; reasoning: string }> => {
  
  if (!process.env.GEMINI_API_KEY) {
    //defensive coding
    console.warn("No API Key found. Returning mock response.");
    return {
        recommendedIds: availableProducts.slice(0, 2).map(p => p.id),
        reasoning: "API Key missing. Showing default recommendations."
    };
  }

  const productContext = availableProducts.map(p => 
    `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Description: ${p.description}, Price: $${p.price}`
  ).join('\n');

  // prepare prompt
  const prompt = `
    You are an expert personal shopper for a high-end minimalist jewelry brand called 'Lumière'.
    
    User Request: "${query}"

    Available Products Inventory:
    ${productContext}

    Task: Recommend 1-3 products that best match the user's request. 
    Explain briefly why you chose them.
    Return ONLY JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        //exactly like this, no extra stuff
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedProductIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Array of matching product IDs"
            },
            reasoning: {
              type: Type.STRING,
              description: "A short, elegant, precise paragraph in warm tone, explaining the choice to the customer."
            }
          },
          required: ["recommendedProductIds", "reasoning"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      recommendedIds: result.recommendedProductIds || [],
      reasoning: result.reasoning || "Here are some items we think you'll love."
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      recommendedIds: [],
      reasoning: "We are having trouble connecting to our stylist right now, but please explore our collection."
    };
  }
};






