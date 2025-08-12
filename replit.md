# Sono Zen - Landing Page & Lead Capture System

## Overview
Sono Zen is a sleep wellness product landing page designed to promote and sell a 7-night Oriental sleep method. It functions as a complete marketing funnel, incorporating lead capture, customer testimonials, detailed product information, and purchase processing to convert visitors into customers. The project aims to provide a modern, conversion-optimized platform for individuals seeking solutions for sleep issues, leveraging a holistic approach to sleep improvement.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture
Sono Zen is a full-stack web application employing a modern monorepo structure.

**Technical Stack:**
- **Frontend**: React with TypeScript, Vite for build tooling, Wouter for routing, TanStack Query for server state management.
- **Backend**: Express.js API server with TypeScript.
- **Database**: PostgreSQL with Drizzle ORM.
- **Styling**: Tailwind CSS with shadcn/ui components.

**Key Architectural Decisions:**
- **Monorepo Pattern**: Clear separation between client, server, and shared code for maintainability.
- **Modular Frontend**: Components built on shadcn/ui with custom theming, enabling easy assembly of landing page sections (hero, problem, method, journey, benefits, testimonials, pricing, author, FAQ, footer).
- **Form Handling**: React Hook Form with Zod validation for robust data input.
- **Responsive Design**: Mobile-first approach ensuring optimal display across devices.
- **Visual Identity**: Cloud-themed design featuring blue gradients, floating cloud animations, and a focus on tranquility.
- **RESTful API**: Endpoints for lead capture (`/api/leads`) and purchase processing (`/api/purchases`) with Zod schemas for data validation.
- **Abstracted Storage**: Supports both in-memory (development) and database (production) storage for flexibility.
- **Centralized Error Handling**: Consistent error responses with appropriate HTTP status codes.
- **Database Schema**: Includes tables for Users (future authentication), Leads (name, email, phone), and Purchases (transaction details, status).
- **Seamless Checkout**: Integrated Cakto payment system via an iframe modal allows users to complete purchases without leaving the site, supported by professional loading modals.
- **Conversion Tracking**: Advanced system for UTM parameter capture and Facebook Conversions API integration, focusing on ViewContent, InitiateCheckout, and Purchase events, with SHA-256 hashing for user data privacy.
- **Content Delivery**: Utilizes both HTML5 video elements and YouTube embeds for media content, prioritizing performance and quality.
- **VSL Integration**: Incorporates ConvertAI Video Sales Letter (VSL) sections strategically throughout the user journey.
- **Lead Assessment**: Features a professional AI-powered sleep assessment designed to identify user pain points and provide personalized recommendations, enhancing lead capture through psychological engagement.

## External Dependencies
- **React 18**: Frontend library.
- **Express.js**: Backend web framework.
- **Drizzle ORM**: PostgreSQL ORM.
- **Vite**: Build tool.
- **shadcn/ui**: UI component library.
- **Tailwind CSS**: CSS framework.
- **Lucide React**: Icon library.
- **PostgreSQL**: Relational database.
- **Neon Database**: Serverless PostgreSQL for cloud deployment.
- **TypeScript**: Programming language for type safety.
- **ESBuild**: Bundler.
- **Wouter**: Client-side router.
- **TanStack Query**: Server state management.
- **React Hook Form**: Form management.
- **Zod**: Schema validation.
- **Cakto**: Payment processing platform.
- **UTMify**: UTM parameter tracking.
- **Facebook Pixel / Conversions API**: Ad tracking and conversion measurement.
- **ConvertAI**: Video Sales Letter (VSL) hosting and integration.

## Recent Changes

### 12/08/2025 - UTMify Pixel Implementado
- Adicionado UTMify Pixel com ID: 689acb039da0aae12d5a0f44
- Script carregado dinamicamente via JavaScript no head
- Sistema de tracking duplo funcionando (Facebook + UTMify)
- Logs confirmam funcionamento correto dos pixels
- Push realizado com sucesso para GitHub

### 12/08/2025 - Programa Completo de 4 Fases Implementado
- Substituídas todas as imagens do programa pelas novas versões das 4 fases fornecidas pelo usuário
- Criado arquivo `shared/program-data.ts` com conteúdo detalhado de todas as 30 atividades
- Implementada nova página `/programa` com interface expansível para visualizar programa completo
- Adicionado link "Programa Completo" na navegação (desktop e mobile)
- Atualizadas referências de imagens em `program-content-section.tsx`
- Status: Projeto funcionando, arquivos prontos para push ao GitHub