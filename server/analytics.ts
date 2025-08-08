import { nanoid } from "nanoid";
import { AnalyticsEvent, AnalyticsStats } from "../shared/schema";

// In-memory analytics storage
class AnalyticsStorage {
  private events: AnalyticsEvent[] = [];

  addEvent(type: AnalyticsEvent['type'], prompt?: string, userAgent?: string, referer?: string): AnalyticsEvent {
    const event: AnalyticsEvent = {
      id: nanoid(),
      type,
      timestamp: new Date(),
      prompt,
      userAgent,
      referer,
    };
    
    this.events.push(event);
    
    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }
    
    return event;
  }

  getStats(): AnalyticsStats {
    const totalLinksGenerated = this.events.filter(e => e.type === 'link_generated').length;
    const totalLinksVisited = this.events.filter(e => e.type === 'link_visited').length;
    
    // Get recent events (last 50)
    const recentEvents = this.events.slice(-50).reverse();
    
    // Calculate top prompts
    const promptCounts = new Map<string, number>();
    this.events
      .filter(e => e.type === 'link_generated' && e.prompt)
      .forEach(e => {
        const prompt = e.prompt!;
        promptCounts.set(prompt, (promptCounts.get(prompt) || 0) + 1);
      });
    
    const topPrompts = Array.from(promptCounts.entries())
      .map(([prompt, count]) => ({ prompt, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
    
    // Calculate daily stats for last 30 days
    const dailyStats = this.calculateDailyStats();
    
    return {
      totalLinksGenerated,
      totalLinksVisited,
      recentEvents,
      topPrompts,
      dailyStats,
    };
  }

  private calculateDailyStats() {
    const days = 30;
    const dailyStats = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const dayEvents = this.events.filter(e => 
        e.timestamp >= date && e.timestamp < nextDate
      );
      
      const generated = dayEvents.filter(e => e.type === 'link_generated').length;
      const visited = dayEvents.filter(e => e.type === 'link_visited').length;
      
      dailyStats.push({
        date: date.toISOString().split('T')[0],
        generated,
        visited,
      });
    }
    
    return dailyStats;
  }

  // Clear old events (older than 30 days)
  cleanup() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.events = this.events.filter(e => e.timestamp > thirtyDaysAgo);
  }
}

export const analyticsStorage = new AnalyticsStorage();

// Run cleanup every hour
setInterval(() => {
  analyticsStorage.cleanup();
}, 60 * 60 * 1000);