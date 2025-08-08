import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DemoAnimationProps {
  prompt: string;
  autoPlay?: boolean;
  shouldLoop?: boolean;
}

export default function DemoAnimation({
  prompt,
  autoPlay = true,
  shouldLoop = true,
}: DemoAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [typedText, setTypedText] = useState("");

  const steps = [
    "Opening Replit...",
    "Finding AI Chat...",
    "Typing your question...",
    "Ready to ask AI!",
  ];

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

  const handleSendChat = () => {
    const encodedPrompt = encodeURIComponent(prompt);
    const replitUrl = `https://replit.com/ai?q=${encodedPrompt}`;
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
              className="w-8 h-8 rounded"
              style={{ backgroundColor: "var(--replit-orange)" }}
            ></div>
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

          {/* Send Chat Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: currentStep >= 1 ? 1 : 0.3,
              scale: currentStep >= 1 ? 1 : 0.8,
              backgroundColor:
                currentStep >= 1 ? "var(--replit-orange)" : "#e5e7eb",
            }}
            transition={{ duration: 0.5 }}
            className="text-white px-6 py-4 rounded-lg font-semibold flex items-center cursor-pointer"
            data-testid="ai-chat-button"
            onClick={handleSendChat}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z"
                clipRule="evenodd"
              />
            </svg>
            Send Chat
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
