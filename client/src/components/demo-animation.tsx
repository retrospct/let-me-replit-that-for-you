import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface DemoAnimationProps {
  prompt: string;
  autoPlay?: boolean;
}

export default function DemoAnimation({ prompt, autoPlay = false }: DemoAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [typedText, setTypedText] = useState("");

  const steps = [
    "Opening Replit...",
    "Finding AI Chat...",
    "Typing your question...",
    "Ready to ask AI!"
  ];

  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, currentStep === 2 ? 3000 : 1500); // Longer delay for typing step

      return () => clearTimeout(timer);
    }
  }, [currentStep, isPlaying, steps.length]);

  // Typing animation for step 2
  useEffect(() => {
    if (currentStep === 2 && isPlaying) {
      setTypedText("");
      let index = 0;
      const typeTimer = setInterval(() => {
        if (index < prompt.length) {
          setTypedText(prev => prev + prompt[index]);
          index++;
        } else {
          clearInterval(typeTimer);
        }
      }, 100);

      return () => clearInterval(typeTimer);
    }
  }, [currentStep, isPlaying, prompt]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setTypedText("");
    setIsPlaying(true);
  };

  return (
    <div className="rounded-lg overflow-hidden border" style={{ borderColor: "hsl(210 5.2632% 14.9020%)" }}>
      {/* Mock Browser Window */}
      <div className="bg-gray-700 px-4 py-3 flex items-center space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <div className="bg-gray-600 text-gray-300 px-3 py-1 rounded text-sm ml-4 font-mono">
          replit.com
        </div>
        {!isPlaying && (
          <Button
            size="sm"
            variant="outline"
            onClick={resetAnimation}
            className="ml-auto"
            data-testid="button-replay"
          >
            Replay Demo
          </Button>
        )}
      </div>

      {/* Simulated Replit Interface */}
      <div className="p-6 bg-white text-black min-h-80 relative">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded" style={{ backgroundColor: "var(--replit-orange)" }}></div>
            <span className="font-bold text-xl">Replit</span>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: currentStep >= 1 ? 1 : 0.3,
              scale: currentStep >= 1 ? 1 : 0.8,
              backgroundColor: currentStep >= 1 ? "var(--replit-orange)" : "#e5e7eb"
            }}
            transition={{ duration: 0.5 }}
            className="text-white px-4 py-2 rounded-lg font-semibold flex items-center"
            data-testid="ai-chat-button"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 10a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
            </svg>
            AI Chat
          </motion.div>
        </div>
        
        {/* Chat Input Area */}
        <motion.div 
          className="bg-gray-100 rounded-lg p-4 border-2 border-dashed border-gray-300"
          animate={{
            borderColor: currentStep >= 2 ? "var(--replit-orange)" : "#d1d5db",
            backgroundColor: currentStep >= 2 ? "#f8fafc" : "#f3f4f6"
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 mb-2">AI Chat Input:</div>
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
                  {isPlaying && currentStep === 2 && (
                    <span className="animate-ping">|</span>
                  )}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex items-center space-x-4">
            <div 
              className="flex-1 h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "#e5e7eb" }}
            >
              <motion.div
                className="h-full"
                style={{ backgroundColor: "var(--replit-orange)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: "var(--replit-orange)" }}>
              {currentStep < steps.length ? steps[currentStep] : "Complete!"}
            </span>
          </div>
        </div>

        {/* Animated Cursor */}
        <AnimatePresence>
          {isPlaying && currentStep === 1 && (
            <motion.div
              className="absolute w-4 h-4 pointer-events-none z-10"
              initial={{ x: 100, y: 100, opacity: 0 }}
              animate={{ 
                x: window.innerWidth > 768 ? 600 : 280, 
                y: 80, 
                opacity: 1 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              data-testid="animated-cursor"
            >
              <svg 
                className="w-4 h-4 text-black" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.84l10.36 8.28a1 1 0 01-.08 1.65l-3.47 2.17 1.61 3.07a1 1 0 01-1.76.92L11.5 15.5l-3.47 2.17a1 1 0 01-1.54-1.28L8.74 9.2 2.84 6.3a1 1 0 01.46-1.92h3z"/>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
