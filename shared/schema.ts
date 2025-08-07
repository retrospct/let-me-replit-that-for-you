import { z } from "zod";

// Simple types for ephemeral usage - no database storage
export const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

export const demoResponseSchema = z.object({
  url: z.string(),
  prompt: z.string(),
});

export type PromptRequest = z.infer<typeof promptSchema>;
export type DemoResponse = z.infer<typeof demoResponseSchema>;
