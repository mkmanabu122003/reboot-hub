import { GoogleGenerativeAI } from '@google/generative-ai';

interface KeyState {
  key: string;
  index: number;
  cooldownUntil: number;
  disabled: boolean;
}

export class GeminiKeyRotator {
  private keys: KeyState[];
  private currentIndex: number = 0;

  constructor() {
    const rawKeys = process.env.GEMINI_API_KEYS || '';
    if (!rawKeys) {
      throw new Error('GEMINI_API_KEYS is not set in .env.local');
    }

    this.keys = rawKeys
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean)
      .map((key, index) => ({ key, index: index + 1, cooldownUntil: 0, disabled: false }));

    if (this.keys.length === 0) {
      throw new Error('No valid API keys found in GEMINI_API_KEYS');
    }

    console.log(`[GeminiKeyRotator] Loaded ${this.keys.length} API key(s)`);
  }

  private getNextAvailableKey(): KeyState | null {
    const now = Date.now();
    const total = this.keys.length;

    for (let i = 0; i < total; i++) {
      const idx = (this.currentIndex + i) % total;
      const ks = this.keys[idx];
      if (!ks.disabled && ks.cooldownUntil <= now) {
        this.currentIndex = (idx + 1) % total;
        return ks;
      }
    }

    return null;
  }

  private getEarliestCooldownEnd(): number {
    return Math.min(
      ...this.keys.filter((k) => !k.disabled).map((k) => k.cooldownUntil)
    );
  }

  async generateImage(prompt: string): Promise<Buffer> {
    const maxRetries = this.keys.length * 2;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      const keyState = this.getNextAvailableKey();

      if (!keyState) {
        const earliest = this.getEarliestCooldownEnd();
        const waitMs = earliest - Date.now();
        if (waitMs > 0) {
          console.log(
            `[GeminiKeyRotator] All keys on cooldown. Waiting ${Math.ceil(waitMs / 1000)}s...`
          );
          await new Promise((r) => setTimeout(r, waitMs + 500));
          continue;
        }
      }

      if (!keyState) {
        throw new Error('All API keys are disabled or exhausted');
      }

      try {
        const genAI = new GoogleGenerativeAI(keyState.key);
        const model = genAI.getGenerativeModel({
          model: 'gemini-2.5-flash-image',
          generationConfig: {
            // @ts-expect-error - responseModalities is supported but not yet in types
            responseModalities: ['image', 'text'],
          },
        });

        console.log(
          `[GeminiKeyRotator] Generating with key #${keyState.index}`
        );

        const result = await model.generateContent(prompt);
        const response = result.response;
        const parts = response.candidates?.[0]?.content?.parts;

        if (!parts) {
          throw new Error('No parts in response');
        }

        for (const part of parts) {
          if (part.inlineData) {
            return Buffer.from(part.inlineData.data, 'base64');
          }
        }

        throw new Error('No image data in response');
      } catch (error: unknown) {
        const err = error as { status?: number; message?: string };

        if (err.status === 429) {
          console.warn(
            `[GeminiKeyRotator] Rate limited on key #${keyState.index}, cooling down 60s`
          );
          keyState.cooldownUntil = Date.now() + 60_000;
          continue;
        }

        if (err.status === 401 || err.status === 403) {
          console.warn(
            `[GeminiKeyRotator] Invalid key #${keyState.index}, disabling`
          );
          keyState.disabled = true;
          continue;
        }

        throw error;
      }
    }

    throw new Error('Failed to generate image after all retries');
  }
}
