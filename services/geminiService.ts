
import { GoogleGenAI } from "@google/genai";
import type { Post } from '../types';

// FIX: Per coding guidelines, assume API_KEY is pre-configured and valid.
// The check for process.env.API_KEY and the alert have been removed.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatPostsForPrompt(posts: Post[]): string {
  return posts
    .map(p => `[${p.timestamp}] ${p.author}: ${p.content}`)
    .join('\n');
}

export async function generateSummary(posts: Post[]): Promise<string> {
  const formattedPosts = formatPostsForPrompt(posts);
  // FIX: Use systemInstruction to set the persona of the AI assistant, separating it from the main prompt.
  const systemInstruction = 'あなたは優秀なアシスタントです。';
  const prompt = `以下のチャネル投稿内容を読み、簡潔で分かりやすい箇条書きで要約してください。特に、以下の3点に焦点を当ててください。
・このチャネルで何が行われているか
・課題や締切
・現在の進捗状況

投稿内容：
${formattedPosts}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for summary:", error);
    throw new Error("Failed to generate summary from AI.");
  }
}

export async function askQuestion(posts: Post[], question: string): Promise<string> {
  const formattedPosts = formatPostsForPrompt(posts);
  // FIX: Use systemInstruction to set the persona of the AI assistant, separating it from the main prompt.
  const systemInstruction = 'あなたは優秀なアシスタントです。';
  const prompt = `以下のチャネルの投稿内容を背景情報として、ユーザーからの質問に答えてください。答えは投稿内容に記載されている事実にのみ基づいてください。もし情報がなければ、「投稿からは分かりませんでした」と正直に答えてください。

背景情報 (チャネル投稿):
${formattedPosts}

---
ユーザーの質問:
${question}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for question:", error);
    throw new Error("Failed to get an answer from AI.");
  }
}
