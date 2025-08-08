import type { Express } from "express";
import { z } from "zod";
import { compressText } from "../shared/compression.js";

// Simple schema for prompt validation
const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

export async function registerRoutes(app: Express): Promise<void> {
  // Generate demo link (ephemeral - no storage)
  app.post("/api/generate", async (req, res) => {
    try {
      const { prompt } = promptSchema.parse(req.body);
      const isDev = process.env.NODE_ENV === "development";
      // Compress and encode the prompt
      const compressedPrompt = compressText(prompt);
      const baseUrl = isDev ? "localhost:5000" : req.get("host");
      const protocol = isDev ? "http" : req.get("x-forwarded-proto") || "https";
      const url = `${protocol}://${baseUrl}/replit?q=${compressedPrompt}`;

      // Return the URL directly without storing
      res.json({ url, prompt });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res
          .status(400)
          .json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to generate link" });
      }
    }
  });

}
