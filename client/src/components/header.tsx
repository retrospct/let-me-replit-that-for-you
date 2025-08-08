import { Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header
      className="border-b backdrop-blur-sm sticky top-0 z-50"
      style={{
        borderColor: "var(--replit-border)",
        backgroundColor: "hsl(0, 0%, 98%, 0.9)",
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--replit-orange)" }}
          >
            <Code className="text-white" size={16} />
          </div>
          <h1 className="text-xl font-semibold text-foreground">
            Let Me Replit That For You
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Button
            asChild
            style={{ backgroundColor: "var(--replit-orange)" }}
            className="hover:bg-orange-600"
            data-testid="button-go-to-replit-header"
          >
            <a href="https://replit.com" target="_blank" rel="noopener">
              <ExternalLink className="mr-2" size={16} />
              Go to Replit
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
