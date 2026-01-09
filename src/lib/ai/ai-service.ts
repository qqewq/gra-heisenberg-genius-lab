// src/lib/ai/ai-service.ts
export class AIService {
  async generateHypotheses(prompt: string): Promise<string> {
    // Например, вызов через fetch к /api/llm или напрямую к OpenRouter, Ollama и т.д.
    const res = await fetch('/api/llm/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    return await res.text();
  }
}
