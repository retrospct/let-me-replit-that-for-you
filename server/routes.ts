import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";

// Simple schema for prompt validation
const promptSchema = z.object({
  prompt: z.string().min(1, "Prompt cannot be empty"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate demo link (ephemeral - no storage)
  app.post("/api/demos", async (req, res) => {
    try {
      const { prompt } = promptSchema.parse(req.body);
      
      // Generate URL directly without storing anything
      const encodedPrompt = encodeURIComponent(prompt);
      const baseUrl = req.get('host') || 'localhost:5000';
      const protocol = req.get('x-forwarded-proto') || 'http';
      const url = `${protocol}://${baseUrl}/replit?q=${encodedPrompt}`;
      
      // Return the URL directly without storing
      res.json({ url, prompt });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to generate link" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
