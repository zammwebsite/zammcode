
import { GoogleGenAI, Type } from "@google/genai";
import { ScanResult, ScanMetrics } from '../types';

// Fix: Initialize Gemini AI client
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

/**
 * MOCK AI Health Scan Service
 * This function serves as a fallback.
 */
const runMockHealthScan = (): Promise<ScanResult> => {
  return new Promise(resolve => {
    // Simulate a 5-second analysis time for fallback
    setTimeout(() => {
      const score = Math.floor(Math.random() * (95 - 40 + 1)) + 40;
      let label: 'Sehat' | 'Perlu Istirahat' | 'Perlu Periksa';
      let suggestions: string[];

      if (score > 75) {
        label = 'Sehat';
        suggestions = [
          'Jaga terus pola hidup sehat Anda.',
          'Pastikan tetap terhidrasi sepanjang hari.',
          'Lakukan aktivitas fisik ringan secara teratur.'
        ];
      } else if (score > 50) {
        label = 'Perlu Istirahat';
        suggestions = [
          'Ambil istirahat sejenak dari aktivitas Anda.',
          'Pastikan Anda mendapatkan tidur yang cukup malam ini.',
          'Minum segelas air dan lakukan peregangan ringan.'
        ];
      } else {
        label = 'Perlu Periksa';
        suggestions = [
          'Perhatikan kondisi tubuh Anda lebih saksama.',
          'Pertimbangkan untuk beristirahat total hari ini.',
          'Jika merasa tidak enak badan, segera konsultasi dengan dokter.'
        ];
      }

      const result: ScanResult = {
        scanId: `scan_${new Date().getTime()}`,
        timestamp: new Date().toISOString(),
        score,
        label,
        metrics: {
          fatigueScore: parseFloat((1 - score / 100).toFixed(2)),
          stressScore: parseFloat(Math.random().toFixed(2)),
          tempEstimate: parseFloat((36.5 + Math.random()).toFixed(1)),
          heartRateEstimate: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
        },
        suggestions,
      };

      resolve(result);
    }, 5000);
  });
};

/**
 * AI Health Scan Service using Gemini
 * This function calls the Gemini API with image data of a user's face.
 * It takes a base64 encoded image string and returns a Promise with a ScanResult.
 * If imageDataB64 is not provided, or if the API call fails, it falls back to a mock scan.
 */
export const runHealthScan = async (imageDataB64?: string): Promise<ScanResult> => {
  if (!imageDataB64 || !process.env.API_KEY) {
    console.log("No image data or API key provided, running mock scan.");
    return runMockHealthScan();
  }

  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageDataB64,
      },
    };

    const textPart = {
      text: `Analisis wajah orang dalam gambar untuk memperkirakan kesehatannya. Berikan skor kesehatan holistik dari 40 hingga 95. Berikan juga label dari salah satu dari tiga opsi ini: 'Sehat', 'Perlu Istirahat', atau 'Perlu Periksa'. 'Sehat' untuk skor > 75. 'Perlu Istirahat' untuk skor antara 51 dan 75. 'Perlu Periksa' untuk skor <= 50. Terakhir, berikan 3 saran kesehatan singkat yang dapat ditindaklanjuti dalam Bahasa Indonesia. Respons harus berupa objek JSON. Jangan sertakan format markdown apa pun seperti \`\`\`json.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: 'Skor kesehatan holistik dari 40 hingga 95.' },
            label: { type: Type.STRING, description: "Label kesehatan: 'Sehat', 'Perlu Istirahat', atau 'Perlu Periksa'." },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Tiga saran kesehatan singkat dalam Bahasa Indonesia.',
            },
          },
          required: ['score', 'label', 'suggestions'],
        },
      },
    });

    const jsonString = response.text;
    const aiResult = JSON.parse(jsonString);

    // Sanitize score to be within the expected range
    const score = Math.max(40, Math.min(95, Math.round(aiResult.score)));

    // Generate mock metrics as Gemini can't provide these from a static image
    const metrics: ScanMetrics = {
      fatigueScore: parseFloat((1 - score / 100).toFixed(2)),
      stressScore: parseFloat(Math.random().toFixed(2)),
      tempEstimate: parseFloat((36.5 + Math.random()).toFixed(1)),
      heartRateEstimate: Math.floor(Math.random() * (90 - 60 + 1)) + 60,
    };

    const result: ScanResult = {
      scanId: `scan_${new Date().getTime()}`,
      timestamp: new Date().toISOString(),
      score,
      label: aiResult.label,
      metrics,
      suggestions: aiResult.suggestions,
    };

    return result;

  } catch (error) {
    console.error('Error calling Gemini API, falling back to mock scan:', error);
    return runMockHealthScan();
  }
};
