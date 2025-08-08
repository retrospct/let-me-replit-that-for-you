import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiReplit } from "@icons-pack/react-simple-icons";
import { compressText } from "../../../shared/compression";
import { useToast } from "@/hooks/use-toast";

interface DemoAnimationProps {
  prompt: string;
  autoPlay?: boolean;
  shouldLoop?: boolean;
}

const steps = [
  "Open Replit...",
  "Find the AI Agent chat...",
  "Type your prompt...",
  'Press "Send"...',
];

export default function DemoAnimation({
  prompt,
  autoPlay = true,
  shouldLoop = true,
}: DemoAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [typedText, setTypedText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (isPlaying) {
      let delay = 1500; // Default delay

      if (currentStep === 2) {
        // For typing step, wait for fixed typing duration plus extra time
        const typingTime = 2000; // Fixed 2 seconds typing duration
        delay = typingTime + 1500; // Extra 1.5 seconds after typing completes
      } else if (currentStep === 3) {
        // Stay on final step longer before looping
        delay = shouldLoop ? 3000 : 0; // 3 seconds if looping, immediate if not
      }

      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        } else if (currentStep === steps.length - 1) {
          if (shouldLoop) {
            // Loop back to start if shouldLoop is true
            setCurrentStep(0);
            setTypedText("");
          } else {
            // Stop at final step if shouldLoop is false
            setIsPlaying(false);
          }
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, steps.length, shouldLoop, prompt.length]);

  // Typing animation for step 2
  useEffect(() => {
    if (currentStep === 2 && isPlaying && prompt) {
      setTypedText("");
      let index = 0;
      // Fixed typing duration of 2 seconds regardless of prompt length
      const typingDuration = 2000;
      const interval = prompt.length > 0 ? typingDuration / prompt.length : 50;
      const typeTimer = setInterval(() => {
        if (index < prompt.length) {
          setTypedText(prompt.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeTimer);
        }
      }, interval);

      return () => clearInterval(typeTimer);
    } else if (currentStep >= 2) {
      // Keep the full prompt visible for steps 2+ or when stopped
      setTypedText(prompt);
    } else if (currentStep < 2) {
      // Clear text for earlier steps
      setTypedText("");
    }
  }, [currentStep, isPlaying, prompt]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setTypedText("");
    setIsPlaying(true);
  };

  const handleCopyPrompt = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard.",
      });
    }
  };

  const handleOpenReplit = () => {
    const encodedPrompt = encodeURIComponent(prompt);
    const replitUrl = `https://replit.com/~?q=${encodedPrompt}`;
    window.open(replitUrl, "_blank");
  };

  return (
    <div
      className="rounded-lg overflow-hidden border"
      style={{ borderColor: "var(--replit-border)" }}
    >
      {/* Mock Browser Window */}
      <div className="bg-gray-700 px-4 py-3 flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm ml-4 font-mono">
          replit.com
        </div>
      </div>

      {/* Simulated Replit Interface */}
      <div className="p-6 bg-white text-black min-h-80 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--replit-orange)" }}
            >
              <SiReplit className="text-white" size={18} />
            </div>
            <span className="font-bold text-xl">Replit AI Agent</span>
          </div>
        </div>

        {/* Chat Input Area */}
        <motion.div
          className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300"
          animate={{
            borderColor: currentStep >= 2 ? "var(--replit-orange)" : "#d1d5db",
            backgroundColor: currentStep >= 2 ? "#f8fafc" : "#f3f4f6",
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-lg min-h-8 flex items-center">
            <AnimatePresence mode="wait">
              {currentStep >= 2 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-black"
                  data-testid="text-typing-animation"
                >
                  {typedText}
                  {isPlaying && (currentStep === 2 || currentStep === 3) && (
                    <span className="animate-ping">|</span>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="flex items-center justify-between my-6">
          {/* Progress Indicator */}
          <div className="mt-6 w-3/4">
            <div className="flex items-center space-x-4">
              <div
                className="flex-1 h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: "#e5e7eb" }}
              >
                <motion.div
                  className="h-full"
                  style={{ backgroundColor: "var(--replit-orange)" }}
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <div className="text-sm font-medium mt-4 text-foreground">
              {currentStep < steps.length ? steps[currentStep] : "Complete!"}
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentStep >= 1 ? 1 : 0.3,
              // scale: currentStep >= 1 ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="flex gap-3"
          >
            <motion.button
              className="text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center cursor-pointer bg-primary"
              data-testid="copy-prompt-button"
              onClick={handleCopyPrompt}
              disabled={currentStep < 1}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="w-4 h-4 mr-2"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </motion.button>
            <motion.button
              className="px-4 py-3 rounded-lg font-semibold flex items-center justify-center cursor-pointer border border-2"
              style={{
                borderColor: "var(--replit-orange)",
                color: "var(--replit-orange)",
              }}
              data-testid="open-replit-button"
              onClick={handleOpenReplit}
              disabled={currentStep < 1}
            >
              <svg className="w-4 h-4 mr-2" fill="black" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Replit
            </motion.button>
          </motion.div>
        </div>

        {/* Animated Cursor */}
        <AnimatePresence>
          {isPlaying && currentStep === 1 && (
            <motion.div
              className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10"
              initial={{ x: 50, y: 50, opacity: 0 }}
              animate={{
                x: window.innerWidth > 768 ? 420 : 220,
                y: 105,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              data-testid="animated-cursor"
            >
              <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                <path d="M3 3l18 9-8.5 2.5L10 22z" />
              </svg>
            </motion.div>
          )}
          {isPlaying && currentStep === 2 && (
            <motion.div
              className="absolute top-0 left-0 w-6 h-6 pointer-events-none z-10"
              initial={{
                x: window.innerWidth > 768 ? 420 : 220,
                y: 105,
                opacity: 1,
              }}
              animate={{
                x: 40,
                y: 145,
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              data-testid="animated-cursor-input"
            >
              <svg className="w-6 h-6" fill="black" viewBox="0 0 24 24">
                <path d="M3 3l18 9-8.5 2.5L10 22z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
