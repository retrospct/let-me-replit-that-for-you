# Let Me Replit That For You

A humorous web application that generates shareable demonstration links for Replit's AI assistant - similar to "Let Me Google That For You" but for Replit's platform. The app creates ephemeral URLs that show users how to interact with Replit's AI through animated demonstrations.

## Features

- 🎯 **Ephemeral Operation** - No data storage, completely privacy-focused
- 🎨 **Authentic Replit Branding** - Uses official Replit colors and styling
- ✨ **Smooth Animations** - Powered by Framer Motion for engaging user experience
- 📱 **Responsive Design** - Works seamlessly across all devices
- 🚀 **Fast Performance** - Optimized React application with minimal dependencies
- 🔗 **Shareable Links** - Generate instant demonstration URLs
- 🎭 **Interactive Demo** - Animated typewriter effect and realistic UI simulation

## How It Works

1. Enter a prompt or question you want to demonstrate
2. Click "Generate Link" or press Enter
3. Share the generated URL with others
4. When visited, the link shows an animated demonstration of asking Replit's AI
5. The demo concludes with a redirect to the actual Replit AI interface

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Wouter for routing
- TanStack Query for state management

**Backend:**
- Node.js with Express
- TypeScript with ES modules
- Zod for validation

**UI Components:**
- Custom components built on Radix UI primitives
- Lucide React icons
- Simple Icons for brand icons

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/let-me-replit-that-for-you.git
cd let-me-replit-that-for-you
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5000](http://localhost:5000) in your browser

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configuration
├── server/                # Backend Express application
├── shared/                # Shared types and schemas
└── README.md
```

## API Endpoints

- `POST /api/demos` - Generate demonstration URL

## Environment Variables

The application works out of the box with no required environment variables. All functionality is client-side with ephemeral server-side URL generation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Privacy

This application is designed with privacy in mind:
- No user data is stored or logged
- All operations are ephemeral
- No tracking or analytics
- Generated links contain only the prompt text as URL parameters

## Deployment

The application is ready for deployment on any Node.js hosting platform:

- **Replit**: Works out of the box
- **Vercel**: Supports the Express backend
- **Railway**: Simple Node.js deployment
- **Heroku**: Standard Express app deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Inspiration

Inspired by the classic "Let Me Google That For You" website, adapted for the modern era of AI-powered development tools.