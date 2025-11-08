import { GoogleGenAI, Modality } from "@google/genai";

interface ImagePart {
    data: string;
    mimeType: string;
}

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateSingleImage = async (
  referenceImage: ImagePart,
  brandName: string
): Promise<string> => {
  const model = 'gemini-2.5-flash-image';
  
  const prompt = `Generate a high-quality professional studio photo of a female golden mannequin wearing the exact same outfit from the reference image.
Replicate every element of the clothing with absolute fidelity: fabric texture, lace/embroidery patterns, colors, transparency, stitching, structure, and fit.
Do not change, simplify, stylize, or reinterpret any part of the design.

Mannequin: golden, elegant, curvy, smooth reflective surface, realistic proportions.
No variation in body shape or pose. Front view, close-to-mid full body framing filling ~85% of the frame.

Lighting: cinematic soft key with subtle warm back rim to separate the mannequin; the outfit is the brightest focal point.

Background (fixed like the sample): a luxury fashion studio with silk curtains, pastel floral arrangements, and perfume bottles on golden side tables.
Add a softly glowing neon sign that reads "${brandName}" behind or slightly beside the mannequin, integrated naturally and not overpowering the subject.

Output: generate 1 consistent, ultra-realistic editorial photo that matches this style exactly.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            inlineData: {
              data: referenceImage.data,
              mimeType: referenceImage.mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
          responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }
    throw new Error('No image data found in the API response.');

  } catch (error) {
    console.error(`Error generating image with ${model}:`, error);
    throw new Error('Failed to generate image. Please check the console for details.');
  }
};


export const generateMannequinImages = async (
  referenceImage: ImagePart,
  brandName: string,
  count: number
): Promise<string[]> => {
  if (count < 1) {
    return [];
  }

  const imagePromises: Promise<string>[] = [];
  for (let i = 0; i < count; i++) {
    imagePromises.push(generateSingleImage(referenceImage, brandName));
  }

  return Promise.all(imagePromises);
};
