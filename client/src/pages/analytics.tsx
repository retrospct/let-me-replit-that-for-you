import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart, TrendingUp, Eye, Link, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AnalyticsStats } from "../../../shared/schema";

export default function Analytics() {
  const { data: stats, isLoading, error } = useQuery<AnalyticsStats>({
    queryKey: ["/api/analytics"],
  });

  if (isLoading) {
    return (
      <div 
        className="min-h-screen"
        style={{ backgroundColor: "var(--replit-light-bg)" }}
      >
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" 
               style={{ borderColor: "var(--replit-orange)" }}></div>
          <p className="mt-4 text-lg" style={{ color: "var(--replit-gray)" }}>
            Loading analytics...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div 
        className="min-h-screen"
        style={{ backgroundColor: "var(--replit-light-bg)" }}
      >
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Unable to Load Analytics
          </h1>
          <p className="text-xl mb-8" style={{ color: "var(--replit-gray)" }}>
            There was an error loading the analytics data.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const maxDailyValue = Math.max(...stats.dailyStats.map(day => Math.max(day.generated, day.visited)));

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: "var(--replit-light-bg)" }}
    >
      <Header />

      <main className="container mx-auto px-4 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Usage Analytics
          </h1>
          <p className="text-xl mb-8" style={{ color: "var(--replit-gray)" }}>
            Track how your Let Me Replit links are performing
          </p>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--replit-gray)" }}>
                    Total Links Generated
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalLinksGenerated.toLocaleString()}
                  </p>
                </div>
                <Link className="h-8 w-8" style={{ color: "var(--replit-orange)" }} />
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--replit-gray)" }}>
                    Total Links Visited
                  </p>
                  <p className="text-3xl font-bold text-foreground">
                    {stats.totalLinksVisited.toLocaleString()}
                  </p>
                </div>
                <Eye className="h-8 w-8" style={{ color: "var(--replit-blue)" }} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Activity Chart */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border border-gray-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <BarChart className="h-5 w-5" style={{ color: "var(--replit-orange)" }} />
                <h2 className="text-xl font-semibold text-foreground">
                  Daily Activity (Last 7 Days)
                </h2>
              </div>
              
              <div className="space-y-4">
                {stats.dailyStats.map((day, index) => (
                  <div key={day.date} className="flex items-center gap-4">
                    <div className="w-16 text-sm" style={{ color: "var(--replit-gray)" }}>
                      {formatDate(day.date)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--replit-orange)" }}></div>
                        <span className="text-sm">Generated: {day.generated}</span>
                      </div>
                      <div 
                        className="h-2 rounded-full mb-1" 
                        style={{ backgroundColor: "var(--replit-orange)", opacity: 0.2 }}
                      >
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: "var(--replit-orange)",
                            width: `${maxDailyValue > 0 ? (day.generated / maxDailyValue) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--replit-blue)" }}></div>
                        <span className="text-sm">Visited: {day.visited}</span>
                      </div>
                      <div 
                        className="h-2 rounded-full" 
                        style={{ backgroundColor: "var(--replit-blue)", opacity: 0.2 }}
                      >
                        <div 
                          className="h-2 rounded-full" 
                          style={{ 
                            backgroundColor: "var(--replit-blue)",
                            width: `${maxDailyValue > 0 ? (day.visited / maxDailyValue) * 100 : 0}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-5 w-5" style={{ color: "var(--replit-orange)" }} />
                  <h2 className="text-xl font-semibold text-foreground">
                    Top Prompts
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {stats.topPrompts.length > 0 ? (
                    stats.topPrompts.map((prompt, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground truncate">
                            {prompt.prompt}
                          </p>
                        </div>
                        <div className="ml-4 flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">
                            {prompt.count}
                          </span>
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--replit-orange)" }}></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: "var(--replit-gray)" }}>
                      No prompts tracked yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-5 w-5" style={{ color: "var(--replit-blue)" }} />
                  <h2 className="text-xl font-semibold text-foreground">
                    Recent Activity
                  </h2>
                </div>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {stats.recentEvents.length > 0 ? (
                    stats.recentEvents.map((event, index) => (
                      <div key={event.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-b-0">
                        <div className={`w-3 h-3 rounded-full mt-1 ${
                          event.type === 'link_generated' ? 'bg-orange-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">
                            <span className="font-medium">
                              {event.type === 'link_generated' ? 'Link Generated' : 'Link Visited'}
                            </span>
                            {event.prompt && (
                              <span className="block truncate mt-1" style={{ color: "var(--replit-gray)" }}>
                                "{event.prompt}"
                              </span>
                            )}
                          </p>
                          <p className="text-xs mt-1" style={{ color: "var(--replit-gray)" }}>
                            {formatTime(event.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm" style={{ color: "var(--replit-gray)" }}>
                      No recent activity
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}