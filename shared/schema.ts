import { z } from "zod";

// Simple types for ephemeral usage - no database storage
export const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

export const demoResponseSchema = z.object({
  url: z.string(),
  prompt: z.string(),
});

// Analytics schemas
export const analyticsEventSchema = z.object({
  id: z.string(),
  type: z.enum(["link_generated", "link_visited"]),
  timestamp: z.date(),
  prompt: z.string().optional(),
  userAgent: z.string().optional(),
  referer: z.string().optional(),
});

export const analyticsStatsSchema = z.object({
  totalLinksGenerated: z.number(),
  totalLinksVisited: z.number(),
  recentEvents: z.array(analyticsEventSchema),
  topPrompts: z.array(z.object({
    prompt: z.string(),
    count: z.number(),
  })),
  dailyStats: z.array(z.object({
    date: z.string(),
    generated: z.number(),
    visited: z.number(),
  })),
});

export type PromptRequest = z.infer<typeof promptSchema>;
export type DemoResponse = z.infer<typeof demoResponseSchema>;
export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;
export type AnalyticsStats = z.infer<typeof analyticsStatsSchema>;
