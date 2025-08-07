# Overview

This is a React-based web application called "Let Me Replit That For You" - a tool that generates ephemeral shareable demonstration links to show users how to interact with Replit's AI. The application allows users to input prompts and generates URLs that demonstrate the process of asking questions to Replit's AI assistant, similar to "Let Me Google That For You" but for Replit's platform. The application is completely ephemeral with no data storage.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with three main routes: home, demo, and 404
- **UI Components**: Shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Animations**: Framer Motion for smooth animations and transitions, particularly for the demo simulation
- **Styling**: Tailwind CSS with custom CSS variables for theming, following a dark Replit-inspired design

## Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with endpoints for creating and retrieving demo links
- **Build Process**: ESBuild for production builds, TSX for development server

## Data Storage Solutions
- **Storage Approach**: Completely ephemeral - no data storage or persistence
- **URL Generation**: Direct URL generation without storing prompts or user data
- **Session Management**: No user sessions or data retention
- **Privacy**: Zero data collection ensures complete user privacy

## Development and Production Setup
- **Development**: Vite dev server with hot module replacement and TypeScript checking
- **Production**: Static file serving with Express for API routes
- **Environment**: Configured for Replit with special development banner and cartographer integration
- **API**: Simple URL generation endpoint without any data persistence

## External Dependencies

- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling approach
- **Build Tools**: Vite for frontend bundling, ESBuild for backend compilation
- **Development**: Replit-specific plugins for enhanced development experience
- **External Integrations**: Links redirect users to replit.com with encoded prompt parameters for AI interaction

## Recent Changes (August 2025)

- **Data Storage Removal**: Completely removed all data storage functionality per user request
- **Ephemeral Operation**: Application now generates URLs without storing any user data
- **Database Cleanup**: Removed Drizzle ORM, PostgreSQL configuration, and storage interfaces
- **Simplified API**: Single endpoint for URL generation without persistence
- **Privacy Enhancement**: Zero data collection ensures complete user privacy