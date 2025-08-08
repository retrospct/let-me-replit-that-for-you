import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { analyticsStorage } from "./analytics";
import { promptSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate demo link (ephemeral - no storage)
  app.post("/api/demos", async (req, res) => {
    try {
      const { prompt } = promptSchema.parse(req.body);
      
      // Track link generation
      analyticsStorage.addEvent(
        'link_generated', 
        prompt, 
        req.get('user-agent'), 
        req.get('referer')
      );
      
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

  // Track link visits
  app.post("/api/analytics/visit", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      analyticsStorage.addEvent(
        'link_visited',
        prompt,
        req.get('user-agent'),
        req.get('referer')
      );
      
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to track visit" });
    }
  });

  // Get analytics stats
  app.get("/api/analytics", async (req, res) => {
    try {
      const stats = analyticsStorage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
