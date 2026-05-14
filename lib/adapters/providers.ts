import type { ProviderId } from "@/types/ecosystem";

export interface ProviderAdapter {
  id: ProviderId;
  runCompletion: (payload: {
    model: string;
    prompt: string;
    apiKey: string;
    baseUrl: string;
  }) => Promise<string>;
}

async function postJson<T>(url: string, apiKey: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Provider request failed (${response.status}): ${text}`);
  }
  return (await response.json()) as T;
}

const openAiCompatibleAdapter: ProviderAdapter = {
  id: "openai",
  async runCompletion({ model, prompt, apiKey, baseUrl }) {
    type OpenAIResponse = {
      choices?: { message?: { content?: string } }[];
    };
    const data = await postJson<OpenAIResponse>(`${baseUrl}/chat/completions`, apiKey, {
      model,
      messages: [{ role: "user", content: prompt }],
    });
    return data.choices?.[0]?.message?.content ?? "";
  },
};

const passthroughAdapter: ProviderAdapter = {
  id: "others",
  async runCompletion({ model, prompt }) {
    return `[${model}] adapter placeholder response: ${prompt.slice(0, 120)}`;
  },
};

export const providerAdapters: Record<ProviderId, ProviderAdapter> = {
  openai: openAiCompatibleAdapter,
  nvidia: openAiCompatibleAdapter,
  qwen: openAiCompatibleAdapter,
  deepseek: openAiCompatibleAdapter,
  google: openAiCompatibleAdapter,
  mistral: openAiCompatibleAdapter,
  meta: openAiCompatibleAdapter,
  "stability-ai": openAiCompatibleAdapter,
  "black-forest-labs": openAiCompatibleAdapter,
  microsoft: openAiCompatibleAdapter,
  "moonshot-ai": openAiCompatibleAdapter,
  glm: openAiCompatibleAdapter,
  others: passthroughAdapter,
};
