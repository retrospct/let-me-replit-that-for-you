import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDemoSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate demo link
  app.post("/api/demos", async (req, res) => {
    try {
      const { prompt } = insertDemoSchema.parse(req.body);
      
      // Generate URL with prompt as query parameter
      const encodedPrompt = encodeURIComponent(prompt);
      const baseUrl = req.get('host') || 'localhost:5000';
      const protocol = req.get('x-forwarded-proto') || 'http';
      const url = `${protocol}://${baseUrl}/demo?q=${encodedPrompt}`;
      
      const demo = await storage.createDemo({ prompt, url });
      res.json(demo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create demo" });
      }
    }
  });

  // Get demo by ID
  app.get("/api/demos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const demo = await storage.getDemo(id);
      
      if (!demo) {
        res.status(404).json({ message: "Demo not found" });
        return;
      }
      
      res.json(demo);
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve demo" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
