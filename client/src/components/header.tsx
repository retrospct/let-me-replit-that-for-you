import { Code, ExternalLink, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [location] = useLocation();
  
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
          <nav className="flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location === '/' 
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={location === '/' ? { backgroundColor: "var(--replit-orange)" } : {}}
              data-testid="nav-home"
            >
              Home
            </Link>
            <Link
              href="/analytics"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                location === '/analytics'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={location === '/analytics' ? { backgroundColor: "var(--replit-blue)" } : {}}
              data-testid="nav-analytics"
            >
              <BarChart size={14} />
              Analytics
            </Link>
          </nav>
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
