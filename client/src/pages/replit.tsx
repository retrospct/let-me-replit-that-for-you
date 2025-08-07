import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Code, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import Footer from "@/components/footer";
import DemoAnimation from "@/components/demo-animation";

export default function Replit() {
  const [location] = useLocation();
  const [prompt, setPrompt] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryPrompt = urlParams.get("q");
    if (queryPrompt) {
      setPrompt(queryPrompt);
      // Start animation after a short delay
      setTimeout(() => setShowAnimation(true), 1000);
    }
  }, [location]);

  const handleRedirectToReplit = () => {
    const encodedPrompt = encodeURIComponent(prompt);
    const replitUrl = `https://replit.com/ai?q=${encodedPrompt}`;
    window.open(replitUrl, "_blank");
  };

  if (!prompt) {
    return (
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--replit-light-bg)" }}
      >
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1
            className="text-4xl font-bold mb-4"
            style={{ color: "var(--replit-orange)" }}
          >
            Invalid Let Me Replit That For You Link
          </h1>
          <p className="text-xl mb-8" style={{ color: "var(--replit-gray)" }}>
            This link appears to be missing a prompt.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            style={{ backgroundColor: "var(--replit-orange)" }}
            data-testid="button-home"
          >
            Go Home
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 replit-gradient">
            Let Me Show You How
          </h1>
          <p className="text-xl mb-4" style={{ color: "var(--replit-gray)" }}>
            Here's how you can ask Replit's AI Agent:
          </p>
          <div
            className="max-w-3xl mx-auto p-6 rounded-xl border font-mono text-lg"
            style={{
              backgroundColor: "var(--replit-card)",
              borderColor: "var(--replit-border)",
              color: "var(--replit-orange)",
            }}
            data-testid="text-demo-prompt"
          >
            "{prompt}"
          </div>
        </motion.div>

        {showAnimation && (
          <motion.div
            className="max-w-6xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DemoAnimation prompt={prompt} autoPlay />
          </motion.div>
        )}

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: "var(--replit-orange)" }}
          >
            Ask Replit's AI Agent Yourself
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleRedirectToReplit}
              className="text-lg py-4 px-8"
              style={{ backgroundColor: "var(--replit-orange)" }}
              data-testid="button-go-to-replit"
            >
              <ExternalLink className="mr-2" size={20} />
              Go to Replit AI
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="text-lg py-4 px-8"
              style={{
                borderColor: "var(--replit-blue)",
                color: "var(--replit-blue)",
              }}
              data-testid="button-create-own"
            >
              <Code className="mr-2" size={20} />
              Create Your Own
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
