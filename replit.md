# Overview

This is a React-based web application called "Let Me Replit That For You" - a tool that generates shareable demonstration links to show users how to interact with Replit's AI. The application allows users to input prompts and generates URLs that demonstrate the process of asking questions to Replit's AI assistant, similar to "Let Me Google That For You" but for Replit's platform.

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
- **Primary Storage**: In-memory storage implementation using Maps for demo and user data
- **Database Schema**: Drizzle ORM configured for PostgreSQL with tables for users and demos
- **Database Provider**: Neon Database (@neondatabase/serverless) as the PostgreSQL provider
- **Migration System**: Drizzle Kit for database migrations and schema management

The application is designed to easily migrate from in-memory storage to PostgreSQL when needed, with the ORM layer already configured.

## Development and Production Setup
- **Development**: Vite dev server with hot module replacement and TypeScript checking
- **Production**: Static file serving with Express for API routes
- **Environment**: Configured for Replit with special development banner and cartographer integration
- **Session Management**: PostgreSQL session store (connect-pg-simple) for user sessions

## External Dependencies

- **Database**: Neon PostgreSQL for persistent data storage
- **UI Components**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS for utility-first styling approach
- **Build Tools**: Vite for frontend bundling, ESBuild for backend compilation
- **Development**: Replit-specific plugins for enhanced development experience
- **External Integrations**: Links redirect users to replit.com with encoded prompt parameters for AI interaction