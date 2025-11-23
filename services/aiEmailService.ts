import { GoogleGenAI, Type} from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

export interface EmailProduct {
    name: string;
    price: number;
}

export interface GeneratedEmail {
    subject: string;
    body: string;
    cta: string;
}

export const generateEmailCopy = async (
    type: "abandoned_cart" | "new_collection" | "order_confirmation",
    customerName: string,
    products: EmailProduct[]
): Promise<GeneratedEmail> => {
    
    if(!process.env.GEMINI_API_KEY){
        console.warn("Missing API Key. Returning fallback email");
        return {
            subject: "Your items are waiting",
            body: "We noticed you left a few items behind. Come back anytime!",
            cta: "View your cart"
        }
    }

    const productText = products
    .map(p => `• ${p.name} — $${p.price}`)
    .join("\n");

    const prompt = `
        You are a professional minimalist email copywriter for 'Lumière' jewelry brand.

        Email Type: ${type}
        Customer Name: ${customerName}

        Product Context: ${productText}

        Write an elegant, clearn, premium-feeling email.
        Use a calm, warm, luxury brand tone. 
        No emojis.
        Keep it simple and very persuasive.

        Structure:
        - subject
        - body 
        - cta 

        RETURN ONLY JSON
    `

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        subject: {type: Type.STRING},
                        body: {type: Type.STRING},
                        cta: {type: Type.STRING}
                    },

                    required: ["subject", "body", "cta"]
                }
            }
        });

        const result = JSON.parse(response.text || "{}");
        return {
            subject: result.subject || "Your items are waiting",
            body: result.body || "We saved your items for you",
            cta: result.cta || "Complete your order"
        }
    } catch (error) {
        console.error("AI email error: ", error);
        
        return {
            subject: "We saved your items",
            body: "Something went wrong with our AI stylist. Please try again later.",
            cta: "Visit our store"
        };
    }
}

