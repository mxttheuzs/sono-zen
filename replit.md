# Sono Zen - Landing Page & Lead Capture System

## Overview

Sono Zen is a sleep wellness product landing page built to promote and sell a 7-night Oriental sleep method. The application serves as a complete marketing funnel with lead capture, customer testimonials, detailed product information, and purchase processing capabilities. It's designed as a modern, conversion-optimized landing page targeting people struggling with sleep issues.

## System Architecture

This is a full-stack web application built with a modern monorepo structure:

**Frontend**: React with TypeScript, using Vite for build tooling and development
**Backend**: Express.js API server with TypeScript
**Database**: PostgreSQL with Drizzle ORM for type-safe database operations
**Styling**: Tailwind CSS with shadcn/ui components for a cohesive design system
**Routing**: Wouter for lightweight client-side routing
**State Management**: TanStack Query for server state management

The application follows a monorepo pattern with clear separation between client, server, and shared code.

## Key Components

### Frontend Architecture
- **Component Library**: Built on shadcn/ui with custom Sono Zen theming
- **Landing Page Sections**: Modular components for hero, problem, method, journey, benefits, testimonials, pricing, author, FAQ, and footer
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Visual Identity**: Cloud-themed design with blue gradients and floating cloud animations

### Backend Architecture
- **API Endpoints**: RESTful routes for lead capture (`/api/leads`) and purchase processing (`/api/purchases`)
- **Data Validation**: Zod schemas for runtime type checking
- **Storage Interface**: Abstracted storage layer supporting both in-memory (development) and database (production) storage
- **Error Handling**: Centralized error handling with proper HTTP status codes

### Database Schema
- **Users Table**: Basic user authentication (ready for future admin features)
- **Leads Table**: Captures potential customers (name, email, phone, timestamp)
- **Purchases Table**: Tracks completed transactions with payment details and status

## Data Flow

1. **Landing Page**: Visitors scroll through sections explaining sleep problems and the Sono Zen solution
2. **Lead Capture**: Throughout the page, forms capture visitor information for email marketing
3. **Purchase Flow**: Primary CTA buttons direct to pricing section for immediate purchase
4. **Form Submission**: Client-side validation followed by API calls to store data
5. **Response Handling**: Success/error states provide user feedback

## External Dependencies

### Core Technologies
- **React 18**: Modern React with hooks and concurrent features
- **Express.js**: Lightweight and flexible Node.js web framework
- **Drizzle ORM**: Type-safe PostgreSQL ORM with excellent TypeScript integration
- **Vite**: Fast build tool optimized for modern web development

### UI/UX Libraries
- **shadcn/ui**: High-quality React component library built on Radix primitives
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Beautiful icon library with consistent design

### Database & Hosting
- **PostgreSQL**: Robust relational database for production use
- **Neon Database**: Serverless PostgreSQL for cloud deployment (based on connection string usage)

### Development Tools
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundling for production builds

## Deployment Strategy

The application is configured for deployment on Replit with:

- **Development**: `npm run dev` starts both frontend and backend with hot reloading
- **Production Build**: `npm run build` creates optimized bundles using Vite and ESBuild
- **Production Server**: `npm run start` serves the built application
- **Database**: PostgreSQL connection via environment variable `DATABASE_URL`
- **Port Configuration**: Server runs on port 5000, mapped to external port 80

The build process:
1. Vite builds the React frontend to `dist/public`
2. ESBuild bundles the Express server to `dist/index.js`
3. Static files are served from the frontend build directory

## Changelog

Changelog:
- June 27, 2025. Initial setup
- June 27, 2025. Complete design transformation to modern dark theme with elegant card-based layout, SVG illustrations replacing external images, and premium visual identity inspired by modern sleep wellness platforms
- June 27, 2025. Content optimization: reduced features section to focus on core benefits (natural method, 7-night program, oriental techniques, relaxing sounds, ready rituals), updated benefits to show concrete 7-night results (faster sleep, fewer night wakings, more energized mornings), corrected guarantee to 7 days, improved logo design for comfort, fixed button text to "Método - Sono Zen", replaced hero image with user-provided peaceful sleep photo
- June 27, 2025. Enhanced hero section with more attractive copy "Durma Como um Bebê em Apenas 7 Noites", simplified language throughout site for general audience, improved navigation visibility, added animated logo with stars and clouds, focused CTA button to direct to checkout, simplified ebook content descriptions from technical jargon to everyday language
- June 27, 2025. Professional footer redesign with animated logo integration, premium gradients, enhanced trust indicators, and elegant link styling with hover effects
- June 27, 2025. Major upgrade to bonus and target audience sections with premium card designs, gradient backgrounds, interactive hover effects, and simplified conversational language focusing on real-life situations users face
- June 27, 2025. Footer optimization: darker background (slate-950/95), corrected navigation links ("Benefícios" → problema section, "O Método" → conteudo-ebook section, "FAQ" → faq section)
- June 27, 2025. Major mobile optimization for 99% mobile usage: responsive font sizes (text-3xl to text-6xl), improved touch targets (py-4 px-3), optimized button spacing, added fixed CTA button for mobile conversion, enhanced navigation menu with larger touch areas and hover effects
- June 27, 2025. Fixed Netlify deployment issue: identified user was deploying old HTML static version instead of modern React app. Removed old netlify-build folder, created proper netlify.toml configuration, and provided deployment instructions for correct React version with modern dark theme and all optimizations
- June 27, 2025. Successfully uploaded complete React application to GitHub repository (sono-zen) with proper .gitignore, README.md, and deployment configuration. Project is now ready for Netlify deployment with automated build process.
- June 28, 2025. Implemented YouTube music integration: Added YouTube Player API component for specific relaxing music (ZlayI0WKX40), configured automatic looping, default 20% volume, and elegant floating player controls with proper error handling and ready state management.
- June 28, 2025. Finalized background music system: Music now plays automatically and continuously at 20% volume with completely invisible player - no controls or indicators visible to users.
- June 28, 2025. Added small play/pause button: Discrete control button in bottom-right corner for users who want to pause/resume background music.
- June 28, 2025. Enhanced smooth scrolling: Implemented global smooth scroll behavior, custom scrollbar styling, offset compensation for fixed navigation, and improved scroll-to-section functionality across all CTA buttons and navigation links.
- June 28, 2025. Major conversion optimization update: Added urgency badge ("OFERTA LIMITADA - 48H"), social proof ("89 pessoas compraram nas últimas 24h"), extended guarantee to 30 days, improved CTA text to "SIM! QUERO DORMIR COMO UM BEBÊ", WhatsApp support button, and exit-intent popup for users leaving the page. These improvements target higher conversion rates based on proven e-commerce psychology.
- June 28, 2025. Comprehensive conversion enhancement: Added Before/After comparison section showing transformation, objections handling section addressing common doubts, enhanced guarantee visual with prominent green seal, credibility section with social proof metrics (12,847+ transformadas), and professional medical authority positioning. WhatsApp contact moved to footer "Contato" link for cleaner UX.
- June 28, 2025. Pricing section optimization: Removed aggressive sales elements (guarantee seal, social proof counters) and replaced with sleep wellness-focused messaging. Changed "GARANTIA TOTAL" to "SUA TRANSFORMAÇÃO - 7 NOITES PARA UM NOVO VOCÊ" and updated social proof to emphasize personal journey. Added 6th card to objections section addressing investment value concern for balanced grid layout.
- June 28, 2025. Timeline optimization: Updated results messaging to be more persuasive and realistic - "Muitas pessoas dormem melhor já na primeira noite! Outras sentem a diferença na terceira noite. O que todos relatam: em 7 dias, você não vai reconhecer seu sono." Removed "Before vs After" comparison section for cleaner user experience.
- June 28, 2025. Pricing section redesign: Rebuilt pricing section with elegant professional design maintaining original style but enhanced aesthetics. Used consistent CSS variables, proper gradient backgrounds, refined card layouts, and organized features grid for better visual hierarchy.
- June 28, 2025. Interactive sleep comfort quiz implementation: Created comprehensive 5-question quiz with playful, calming UI elements including floating clouds and stars animations. Features personalized sleep profile results (Dorminhoco Zen, Aprendiz do Sono, Buscador de Tranquilidade, Guerreiro da Insônia) with tailored recommendations. Integrated smooth progress tracking, animated transitions, and direct CTA integration to pricing section.

## User Preferences

Preferred communication style: Simple, everyday language.