import { Code, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer 
      className="border-t backdrop-blur-sm mt-20"
      style={{ 
        borderColor: "var(--replit-card)",
        backgroundColor: "hsl(213, 49%, 10%, 0.8)"
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center"
              style={{ backgroundColor: "var(--replit-orange)" }}
            >
              <Code className="text-white" size={12} />
            </div>
            <span className="text-sm" style={{ color: "var(--replit-gray)" }}>
              Made with ❤️ for the coding community
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a 
              href="#" 
              className="text-sm transition-colors hover:text-orange-400"
              style={{ color: "var(--replit-gray)" }}
              data-testid="link-github"
            >
              <Github className="inline mr-1" size={16} />
              GitHub
            </a>
            <a 
              href="#" 
              className="text-sm transition-colors hover:text-orange-400"
              style={{ color: "var(--replit-gray)" }}
              data-testid="link-twitter"
            >
              <Twitter className="inline mr-1" size={16} />
              Twitter
            </a>
            <a 
              href="https://replit.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-orange-400"
              style={{ color: "var(--replit-gray)" }}
              data-testid="link-replit"
            >
              Visit Replit
            </a>
          </div>
        </div>
        <div className="text-center mt-6 pt-6 border-t" style={{ borderColor: "hsl(210 5.2632% 14.9020%)" }}>
          <p className="text-xs" style={{ color: "var(--replit-gray)" }}>
            Not affiliated with Replit. This is a parody site inspired by LMGTFY.
          </p>
        </div>
      </div>
    </footer>
  );
}
