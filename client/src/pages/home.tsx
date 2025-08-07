import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Code,
  Eye,
  WandSparkles,
  Copy,
  Share,
  Bot,
  Database,
  Bug,
  MousePointer,
  Keyboard,
} from "lucide-react";
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
      const response = await apiRequest("POST", "/api/demos", { prompt });
      return response.json();
    },
    onSuccess: (data) => {
      setGeneratedUrl(data.url);
      toast({
        title: "Link Generated!",
        description: "Your demonstration link is ready to share.",
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
      title: "React Component",
      prompt: "How do I create a React component with state?",
      icon: Code,
      color: "text-blue-400",
    },
    {
      title: "API Integration",
      prompt: "How do I fetch data from an API in Python?",
      icon: Database,
      color: "text-purple-400",
    },
    {
      title: "Debug Error",
      prompt: "Why am I getting 'undefined is not a function'?",
      icon: Bug,
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 replit-gradient">
            For all those people who find it more effort to explain than to just
            do it themselves.
          </h2>
          <p
            className="text-xl max-w-3xl mx-auto mb-8"
            style={{ color: "var(--replit-gray)" }}
          >
            Generate a link to show someone how to use Replit's AI to solve
            their coding problem. It's like{" "}
            <a
              href="https://letmegooglethat.com/"
              target="_blank"
              rel="noopener"
            >
              Let Me Google That For You
            </a>
            , but for when they should just ask Replit's AI Agent instead of
            you!
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
                  className="block text-lg font-medium mb-4"
                  style={{ color: "var(--replit-orange)" }}
                >
                  What should they ask Replit's AI?
                </label>
                <div className="relative">
                  <Input
                    id="prompt-input"
                    data-testid="input-prompt"
                    placeholder="e.g., How do I create a React component with state?"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
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
                      style={{ backgroundColor: "var(--replit-purple)" }}
                      data-testid="button-share"
                    >
                      <Share className="mr-2" size={16} />
                      Share
                    </Button>
                    <Button
                      variant="outline"
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
          <Card style={{ backgroundColor: "var(--replit-card)", borderColor: "var(--replit-border)" }}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center" style={{ color: "var(--replit-orange)" }}>
                <Eye className="inline mr-2" size={24} />
                How the Demo Works
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: MousePointer, title: "Step 1: Open Replit", description: "Animated cursor navigates to replit.com", color: "var(--replit-orange)" },
                  { icon: Bot, title: "Step 2: Find AI Chat", description: "Highlights the AI assistant button", color: "var(--replit-blue)" },
                  { icon: Keyboard, title: "Step 3: Type Query", description: "Types the provided prompt with animation", color: "var(--replit-green)" }
                ].map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={index}
                      className="rounded-xl p-6 border group hover:border-opacity-100 transition-all duration-300"
                      style={{ 
                        backgroundColor: "var(--replit-card)", 
                        borderColor: "var(--replit-border)" 
                      }}
                      whileHover={{ scale: 1.02 }}
                      data-testid={`step-${index + 1}`}
                    >
                      <div className="text-center mb-4">
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors"
                          style={{ 
                            backgroundColor: `${step.color}20`,
                            color: step.color 
                          }}
                        >
                          <Icon size={32} />
                        </div>
                        <h4 className="font-semibold text-lg text-foreground">{step.title}</h4>
                      </div>
                      <p className="text-center" style={{ color: "var(--replit-gray)" }}>
                        {step.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <DemoAnimation prompt={prompt || "How do I create a React component with state?"} />
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
            Popular Examples
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
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                      style={{ backgroundColor: `${example.color}20` }}
                    >
                      <Icon className={example.color} size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 group-hover:text-orange-400 transition-colors">
                        {example.title}
                      </h4>
                      <p
                        className="text-sm"
                        style={{ color: "var(--replit-gray)" }}
                      >
                        "{example.prompt}"
                      </p>
                    </div>
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
