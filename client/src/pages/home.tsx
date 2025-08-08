import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Link,
  Eye,
  WandSparkles,
  Copy,
  Bot,
  Timer,
  Loader,
} from "lucide-react";
import { SiReplit } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DemoAnimation from "@/components/demo-animation";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const { toast } = useToast();

  const generateDemo = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await apiRequest("POST", "/api/generate", { prompt });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedUrl(data.url);
      toast({
        title: "Link Generated!",
        description: "Your ephemeral link is ready to share.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate link. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a question for Replit's AI.",
        variant: "destructive",
      });
      return;
    }
    generateDemo.mutate(prompt);
  };

  const handleCopy = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      toast({
        title: "Copied!",
        description: "URL copied to clipboard.",
      });
    }
  };

  const examples = [
    {
      title: "Link in Bio Website",
      prompt:
        "Make a link in bio app that presents all my social accounts in an easy, intuitive, and aesthetic interface. Use a random image for a profile picture placeholder for now. Add hover effects on buttons, a modern card layout, and customizable color themes.",
      icon: Link,
      color: "text-blue-400",
    },
    {
      title: "Meditation Timer",
      prompt:
        "Make a peaceful meditation app with customizable ambient sounds, interval bells, and session tracking. Include guided breathing animations and a serene, minimalist design.",
      icon: Timer,
      color: "text-purple-400",
    },
    {
      title: "Waitlist Website",
      prompt:
        "Make a waitlist site for my startup that collects emails and full names from users. Include some basic information about my startup and make the design modern and professional. Use a postgres database to store the registrations. Design it with a beautiful hero section and elegant glass-like elements.",
      icon: Loader,
      color: "text-green-400",
    },
  ];

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
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className="w-10 h-10 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--replit-orange)" }}
            >
              <SiReplit className="text-white" size={24} />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Replit
            </h2>
          </div>
          <p
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: "var(--replit-gray)" }}
          >
            It's like{" "}
            <a
              href="https://letmegooglethat.com/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Let Me Google That For You
            </a>
            , but for when they should just ask{" "}
            <a
              href="https://replit.com/"
              target="_blank"
              rel="noopener"
              className="underline"
            >
              Replit's AI Agent
            </a>{" "}
            to create the app instead of asking you!
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card
            style={{
              backgroundColor: "var(--replit-card)",
              borderColor: "var(--replit-border)",
            }}
          >
            <CardContent className="p-8">
              <div className="mb-8">
                <label
                  htmlFor="prompt-input"
                  className="block text-lg font-medium mb-4 text-foreground"
                >
                  What should they ask Replit's AI?
                </label>
                <div className="relative">
                  <Input
                    id="prompt-input"
                    data-testid="input-prompt"
                    placeholder="Create an app that notifies the office when lunch is ready..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !generateDemo.isPending) {
                        handleGenerate();
                      }
                    }}
                    className="text-lg py-4 pr-12"
                    style={{
                      backgroundColor: "var(--input)",
                      borderColor: "var(--replit-border)",
                      color: "var(--foreground)",
                    }}
                  />
                  <Bot
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleGenerate}
                  disabled={generateDemo.isPending}
                  className="py-4 px-8 text-lg font-semibold animate-pulse-orange"
                  style={{ backgroundColor: "var(--replit-orange)" }}
                  data-testid="button-generate"
                >
                  {generateDemo.isPending ? (
                    <>Loading...</>
                  ) : (
                    <>
                      <WandSparkles className="mr-2" size={20} />
                      Generate Link
                    </>
                  )}
                </Button>
              </div>

              {generatedUrl && (
                <motion.div
                  className="mt-6 p-6 rounded-xl border"
                  style={{
                    backgroundColor: "var(--muted)",
                    borderColor: "var(--replit-border)",
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  data-testid="generated-link"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-lg font-semibold"
                      style={{ color: "var(--replit-green)" }}
                    >
                      Your Link is Ready!
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      data-testid="button-copy"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                  <div
                    className="rounded-lg p-4 font-mono text-sm break-all border"
                    style={{
                      backgroundColor: "var(--secondary)",
                      borderColor: "var(--replit-border)",
                    }}
                  >
                    <span data-testid="text-generated-url">{generatedUrl}</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button
                      size="sm"
                      onClick={handleCopy}
                      data-testid="button-copy-link"
                    >
                      <Copy className="mr-2" size={16} />
                      Copy
                    </Button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card
            style={{
              backgroundColor: "var(--replit-card)",
              borderColor: "var(--replit-border)",
            }}
          >
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center text-foreground">
                <Eye
                  className="inline mr-2"
                  size={24}
                  style={{ color: "var(--replit-orange)" }}
                />
                What They Will See
              </h3>

              <DemoAnimation
                prompt={
                  prompt ||
                  "Create an app that notifies the office when lunch is ready"
                }
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3
            className="text-3xl font-bold text-center mb-8"
            style={{ color: "var(--replit-orange)" }}
          >
            Examples
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example, index) => {
              const Icon = example.icon;
              return (
                <motion.div
                  key={index}
                  className="rounded-xl p-6 border cursor-pointer group transition-all duration-300"
                  style={{
                    backgroundColor: "var(--replit-card)",
                    borderColor: "var(--replit-border)",
                  }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPrompt(example.prompt)}
                  data-testid={`example-${index}`}
                >
                  <div className="flex flex-col items-start space-x-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ backgroundColor: `${example.color}20` }}
                      >
                        <Icon className={example.color} size={20} />
                      </div>
                      <h4 className="font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {example.title}
                      </h4>
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--replit-gray)" }}
                    >
                      "{example.prompt}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
