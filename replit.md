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
- June 28, 2025. Major design consistency upgrade: Applied method section's successful visual style (professional layout, conversational language, quality imagery) to problem and benefits sections. Removed "3 Pilares do Sono Zen" section and replaced with relaxing diffuser/singing bowls image. Enhanced sections now feature same 2-column layout with explanatory text left, visual element right, maintaining consistent professional quality throughout site.
- June 29, 2025. Comprehensive micro-animations implementation: Added sophisticated animation system with bounce-gentle, scale-in, fade-in-up, heartbeat, magnetic-hover, shimmer, and glow-pulse effects. Applied full intensity animations to problem and ebook content sections with transparent backgrounds, blue borders, and engaging hover effects. Applied lighter animations to bonus sections maintaining clean aesthetic while enhancing user engagement and emotional connection.
- June 29, 2025. Animation speed optimization: Slowed down all animations for zen-like experience (bounce-gentle from 2s to 4s, heartbeat from 2s to 5s, twinkle from 3s to 6s, sparkle from 4s to 8s, float-cloud from 20s to 35s). Removed all bounce-gentle animations from CheckCircle icons across hero, problem, benefits, FAQ, and ebook content sections for calmer, more peaceful user experience.
- June 29, 2025. Pricing section redesign: Transformed payment area with clean blue/transparent aesthetic. Card background changed to accent-blue/5 with blue/20 borders, features grid redesigned with blue accents, pricing section enhanced with blue/warm-accent gradients. Created sophisticated transparent payment button with blue/golden borders, shimmer effects, subtle hover animations, and elegant gradient text. Updated security badges with consistent blue/transparent design and rounded pill styling.
- June 29, 2025. Premium price display: Enhanced R$ 19,90 with elegant white typography, shadow effects, gradient glow background, and larger font sizing (5xl-7xl) for premium presentation while maintaining clean transparency throughout payment section.
- June 29, 2025. Payment button enhancement: Replaced golden colors with blue theme, added enhanced floating animation with multi-directional movement (X, Y, scale), created blue glow pulse animation for better conversion attention, and applied thin blue border with transparent background for professional look.
- June 29, 2025. Text enhancement optimization: Added subtle white textShadow glow to all payment section text while preserving original color variables, creating discrete but impactful background lighting effect that improves readability and visual appeal without changing the established color scheme.
- June 29, 2025. Payment section styling updates: Changed icon glow effects from yellow to smaller blue glow using drop-shadow filters, transformed payment button from transparent to golden gradient background with enhanced golden glow effect, and replaced cloud icon with moon icon in payment button for better sleep theme consistency. Maintained 30-day guarantee as correct period.
- June 29, 2025. Golden glow cleanup: Removed golden glow pulse animations from ebook content section icons for cleaner visual appearance while maintaining 30-day guarantee in pricing section as the correct guarantee period.
- June 29, 2025. Premium visual enhancements: Strengthened "Bem-Estar" text with vibrant multi-color gradient and golden glow effect. Redesigned "Sono Zen - Método Completo" section with sophisticated layout including decorative elements, prominent moon icon, enhanced typography hierarchy, and premium visual depth for more engaging user experience.
- June 29, 2025. Complete mobile optimization: Implemented comprehensive responsive design with mobile-first approach including responsive typography scaling, optimized touch targets, mobile-specific layouts for pricing section, payment button optimization, security badges vertical stacking, and enhanced modal experience. All elements now perfectly scaled for 99% mobile usage with maintained premium visual identity.
- June 29, 2025. Pricing section cleanup: Removed disruptive "Sua jornada para o sono perfeito começa hoje" banner and features grid with checkmarks from pricing section to create cleaner, more direct flow from product title to pricing display, improving user experience and conversion focus with streamlined layout.
- June 29, 2025. Security badges enhancement: Redesigned guarantee, security, and instant access section with larger prominent cards featuring bigger icons (8x8 to 10x10), individual backgrounds, enhanced titles, and expanded descriptions to fill space from removed features and improve trust indicators visibility.
- June 29, 2025. Bonus section cleanup: Removed "💚 TODOS GRÁTIS HOJE!" promotional message from bonus section for cleaner, more professional presentation focused on product value rather than excessive promotional language.
- June 29, 2025. Premium border enhancement: Implemented sophisticated border styling throughout pricing section with thicker borders (2px), multiple box-shadow layers, blue glow effects, and enhanced visual depth. Added animated gradients and premium visual treatment to main card, pricing section, bonuses, and security badges for luxury appearance.
- June 29, 2025. White glow refinement: Updated all border glow effects from blue/colored to subtle white glow for elegant appearance. Removed inner shadows and excessive effects, keeping only outer border glow in white (8px-20px range) for sophisticated, premium look without visual overload.
- June 29, 2025. Golden-white gradient borders: Enhanced border glow effects with golden-to-white gradient using dual box-shadow layers (golden inner glow + white outer glow) for sophisticated luxury appearance. Maintained thin, elegant borders while creating premium visual depth with subtle color transition from gold to white.
- June 29, 2025. Logical gradient progression: Refined golden-white gradient to create visual hierarchy from top to bottom - stronger golden glow at product header (15px) gradually transitioning to predominantly white glow at guarantee section (4px golden + 22px white), creating natural visual flow that guides user attention downward through the pricing funnel.
- June 29, 2025. Border color update: Changed all golden border glow effects to white throughout pricing section for cleaner, more elegant appearance. All box-shadow effects now use white/rgba(255,255,255) instead of golden colors for sophisticated premium look.
- June 29, 2025. Payment redirect implementation: Added elegant confirmation modal before redirecting to Cakto payment platform (https://pay.cakto.com.br/j6iqgss_456470). Modal features zen-themed design with product benefits reminder, security assurance, and smooth transition experience. Opens payment in new tab for better user experience.
- June 29, 2025. Border glow removal: Removed all white border glow effects (box-shadow) from pricing section elements for cleaner appearance. Cards now display with clean borders only, without additional glow effects, maintaining elegant styling while reducing visual complexity.
- June 29, 2025. Testimonials navigation optimization: Removed navigation buttons entirely for cleaner mobile-first experience targeting Facebook/Instagram ads. Enabled drag-free navigation allowing natural touch gestures on mobile and mouse drag on desktop. Added loop functionality for continuous browsing experience.
- June 30, 2025. Guarantee period adjustment: Changed all guarantee references from 30 days to 7 days throughout the site (hero section, pricing section, exit-intent popup, and HTML meta descriptions) to align with the 7-night sleep transformation method.
- June 30, 2025. Background music volume reduction: Lowered YouTube background music volume from 20% to 10% for more subtle ambient experience that doesn't interfere with content reading.
- June 30, 2025. Mobile music autoplay fix: Implemented mobile detection and user interaction system to solve autoplay restrictions. Added intelligent play button that appears as blue pulsating button on mobile when music isn't playing, and remains discrete gray on desktop. Music now works properly on both mobile and desktop devices.
- June 30, 2025. Music button animation fix: Removed pulsing animation from play/pause button when music is paused for calmer user experience.
- June 30, 2025. Bonus section removal: Completely removed "Bônus Exclusivos" section from ebook content area for cleaner, more focused presentation.
- June 30, 2025. Payment confirmation modal redesign: Replaced explanatory modal with automatic progress bar that empties over 5 seconds and redirects to payment automatically without user interaction buttons.
- June 30, 2025. Redirection reliability fix: Implemented robust fallback system for payment redirection to prevent inconsistent behavior caused by popup blockers.
- June 30, 2025. Hero section animation removal: Removed all loading animations from hero section (title, benefits, CTA button, image) for immediate static display without motion effects.
- June 30, 2025. Payment timer optimization: Reduced redirect timer from 5 seconds to 2.5 seconds for faster checkout flow.
- June 30, 2025. Music system removal: Completely removed YouTube music component due to mobile compatibility issues on iPhone.
- June 30, 2025. Netlify build optimization: Implemented comprehensive build fixes to resolve deployment timeout issues - increased memory allocation, optimized node version, added build caching, and created deployment scripts to handle Lucide React icon processing bottleneck.
- July 2, 2025. UTMify tracking integration: Added UTMify script for UTM parameter capture and tracking on all pages. Script loads asynchronously with data-utmify-prevent-xcod-sck and data-utmify-prevent-subids attributes for optimal performance and privacy compliance.
- July 3, 2025. Pricing update: Changed main price from R$ 19,90 to R$ 27,90 with new reference price of R$ 47,90 (previously R$ 89,70). Updated discount calculation to show 42% OFF savings of R$ 20,00. Also updated Facebook Pixel event tracking values to reflect new pricing.
- July 3, 2025. Major content enhancement: Completely redesigned "O que você vai aprender" section with 6 specialized modules instead of 4 basic ones. Added detailed breakdowns for each module including specific techniques (4-7-8 breathing, acupressure points, 5-4-3-2-1 anxiety method), scientific elements (432Hz frequencies, binaural beats), and practical implementation details. Enhanced titles to be more specific and compelling. Added comprehensive content lists showing exactly what users will learn in each module. Updated header to emphasize "180+ pages of transformative content" and "12,000+ transformations" for stronger social proof.
- July 3, 2025. Content section cleanup: Removed "Perfeito Para Você" target audience section to focus entirely on the 6 specialized modules content. This creates a cleaner, more focused presentation of the learning materials without repetitive audience targeting.
- July 3, 2025. Header removal: Removed entire header section including title "Transformação Completa do Seu Sono em 6 Módulos Especializados", descriptions, and validation badges. Section now displays only the 6 module cards for a cleaner, more direct presentation of the content.
- July 3, 2025. Special offer banner enhancement: Completely redesigned the subtle offer banner into a prominent, eye-catching promotional element with gradient backgrounds (red-orange-yellow), animated pulse effects, larger text, urgency indicators ("48H APENAS"), fire emojis, and hover animations. Increased size significantly with enhanced visual impact including glowing borders and scale effects.
- July 3, 2025. Special offer banner humanization: Redesigned the promotional banner to be smaller, more subtle and human-relatable. Changed from aggressive promotional style to gentle, trustworthy messaging using sleep emoji (💤), softer language ("Oferta especial hoje: Preço de lançamento"), and social proof ("Milhares já transformaram suas noites"). Maintained brand colors but with calmer, more approachable design.
- July 3, 2025. Problem section humanization: Completely rewrote the "Veja se Você se Reconhece" section to use more natural, conversational language. Changed title to "Você Também Passa Por Isso?" and updated all problem descriptions to use everyday language that people can relate to. Transformed clinical descriptions into relatable scenarios like "Você deita na cama e sua cabeça não para" instead of technical explanations.
- July 3, 2025. Offer banner enhancement: Improved the special offer banner with larger size (max-w-lg), enhanced visual elements including double animation (pulse + ping), stronger borders (border-2), increased padding (p-6), and added credibility indicator ("Aprovado por especialistas" with green dot). Made text more prominent and added backdrop blur for premium feel.
- July 3, 2025. Ultra-attractive banner redesign: Completely transformed the offer banner into a high-impact promotional element with vibrant orange-red-yellow gradients, external glow effects, floating "HOJE!" badge with bounce animation, large animated indicators, urgency progress bar showing "76% das vagas preenchidas", multiple status badges (APROVADO/LIMITADO), hover scale effects, and dramatic shadow effects. Maximized visual attention and conversion psychology.
- July 3, 2025. Banner moderation for ebook context: Toned down the banner to be more appropriate for an ebook product. Removed aggressive promotional elements (glow effects, floating badges, progress bars, "vagas" references), replaced with elegant design using brand colors, book emoji (📚), and ebook-appropriate messaging ("Método aprovado", "Acesso imediato"). Maintained visual appeal while being more professional and contextually accurate.
- July 3, 2025. Method section enhancement: Completely redesigned the "O Método Sono Zen" section with more natural, engaging language and visual elements. Added prominent banner asking "E se dormir pudesse ser o momento mais relaxante do seu dia?", changed title to "Transforme Sua Noite em um Momento Sagrado", included conversational explanations with emojis, added "Imagine" scenario box, and created comparison cards showing wrong vs right approach. Made content more relatable and visually appealing.
- July 3, 2025. Content section simplification: Removed top banner from method section and completely replaced "Os 5 Segredos do Sono Oriental" cards section with persuasive text content. New section titled "Por Que Este Método Funciona Mesmo?" uses compelling copywriting with revelation boxes ("A Verdade Que Ninguém Te Conta", "Como Este Método Resolve de Vez") and transformation timeline showing progressive results from Night 1 to Night 7. More focused on persuasion than feature listing.
- July 3, 2025. Testimonials section humanization: Completely revamped testimonials with conversational Portuguese using expressions like "Gente", "Nossa", "Cara" and emojis (💙, 😊, 🌙, ✨). Updated names to be more casual, added emotional elements like "chorei quando consegui dormir", applied celestial color palette to gradients, and changed section title to "Olha Só o Que Eles Falam!" with more relatable subtitle. Enhanced social proof metrics to emphasize transformation results rather than technical statistics.
- July 3, 2025. Sophisticated gradient enhancement: Applied consistent gradient effects to key titles throughout the site, focusing only on strategic keywords for maximum impact. Enhanced titles include "Essas Situações", "7 Noites", "Conquistar", "situações", and "Transformação" with harmonious three-color gradients (warm-accent → accent-blue → celestial-blue). Increased text sizes for better visual hierarchy and added proper spacing with explicit JSX spacing.
- July 3, 2025. Complete pricing section transformation: Redesigned entire payment area with ultra-attractive visual hierarchy. New title "Sua Transformação Começa Hoje" with gradient on "Transformação". Enhanced pricing display with urgency badges, massive gradient price (R$ 27,90), decorative elements, and green savings highlight. Revolutionized purchase button with glow effects, dual moon icons, sparkle animations, and persuasive copy "SIM! QUERO DORMIR COMO UM BEBÊ". Premium security badges with color-coded trust indicators, hover effects, and comprehensive social proof footer. Applied consistent zen-themed gradients and maintained mobile-first responsive design throughout.
- July 3, 2025. Critical bug fixes: Fixed price inconsistency (R$ 19,90 → R$ 27,90 in purchase form), resolved DevTools detection memory leak, added missing purchase amount field in form submissions. Standardized social proof metrics to consistent "14.847 vidas transformadas" across all sections (hero, credibility, pricing).
- July 3, 2025. Content consistency updates: Updated author section with consistent "14.847 vidas transformadas" metrics, refreshed biography with more engaging language, improved personal message for better emotional connection. Updated FAQ section with current numbers (14.847 transformations, 94% success rate), improved response timing messaging ("results in 7 nights"), added new FAQ about accessible pricing (R$ 27,90), and enhanced language throughout for better user engagement.
- July 3, 2025. Premium button redesign: Completely transformed purchase button with sophisticated design featuring larger size, elegant three-color gradients using site's color system (accent-blue → warm-accent → celestial-blue), subtle border glow effects, refined typography, and harmonious integration with overall site design. Replaced "Quero Dormir Melhor" with "Transformar Meu Sono Agora" and removed promotional subtitles for cleaner, more professional appearance. Applied consistent transparency levels and refined animations for premium user experience.
- July 3, 2025. Purchase button optimization: Simplified overly complex button design to elegant, clean style using muted gray-blue colors (hsl 220) for better harmony with site design. Removed excessive visual effects and multiple layers, creating sophisticated professional appearance with subtle hover effects and improved readability.
- July 3, 2025. Special offer banner enhancement: Completely redesigned promotional banner with vibrant orange-red-yellow gradient background, animated elements (pulsing stars, bouncing effects), prominent social proof messaging ("14.847 vidas transformadas"), status indicators with animated dots, and urgency counter ("273 pessoas adquiriram nas últimas 24h"). Repositioned above pricing section for better visual hierarchy and maximum conversion impact.
- July 3, 2025. Hero promotional banner transformation: Completely redesigned the hero section promotional banner with premium visual effects including vibrant orange-red-yellow gradients, outer glow effects, animated background elements (bouncing circles, pulsing overlays), enhanced typography with text shadows, grid layout for status indicators, and dramatic scaling (text-4xl headlines). Created ultra-attractive banner with centered layout, star decorations, and high-impact urgency messaging for maximum conversion potential.
- July 3, 2025. Compact launch banner redesign: Replaced ultra-large promotional banner with harmonious compact design featuring launch stripe at top, reduced size (max-w-xl), integrated site colors using CSS variables, and subtle promotional effects while maintaining conversion elements.
- July 3, 2025. Quiz mobile responsiveness fix: Fixed mobile layout issues in sleep comfort quiz including responsive button sizing (min-h-[60px] on mobile, min-h-[70px] on desktop), improved text wrapping with break-words, reduced padding (px-3 on mobile), responsive typography (text-lg/text-xl), and proper gap spacing for better mobile user experience.
- July 3, 2025. Quiz text optimization for mobile: Shortened overly long option texts that were causing overflow issues on mobile devices. Reduced text like "Ai, demoro mais de meia hora contando carneirinhos" to "Ai, demoro mais de meia hora" and similar adjustments. Added enhanced CSS with !important rules for mobile text wrapping, overflow handling, and container padding to ensure all quiz options display properly within screen boundaries.
- July 3, 2025. Quiz font size enhancement: Increased font sizes across quiz options for better readability - mobile text from text-xs to text-sm (0.875rem), desktop from text-base to text-lg. Adjusted button minimum height to 60px on mobile with improved line-height (1.3) and padding adjustments for better touch targets and visual hierarchy.
- July 3, 2025. Advanced conversion tracking system implementation: Created comprehensive UTM parameter capture and Facebook Conversions API integration system. Features automatic UTM/FBCLID parameter detection, localStorage persistence across sessions, external_id generation for user tracking, enhanced Facebook Pixel events with conversion data, UTMify integration support, and complete conversion funnel tracking (PageView → ViewContent → InitiateCheckout → AddPaymentInfo → Purchase). Added debug component for development testing and parameter validation.
- July 3, 2025. Conversion tracking timing optimization: Fixed premature event triggering issue where InitiateCheckout and AddPaymentInfo events were firing too early. Reorganized event flow so InitiateCheckout only fires when user confirms redirect to payment page, and AddPaymentInfo fires with delay when user actually reaches payment platform. Removed debug UTM button component completely.
- July 3, 2025. Advanced Facebook Conversions API enhancement: Implemented comprehensive user data hashing system using SHA-256 for privacy compliance. Added support for enhanced user parameters including email, phone, names, geolocation data (country, state, city, zip), Facebook browser parameters (fbp, fbc), subscription and lead IDs. Enhanced custom data with order tracking, event IDs, advertiser tracking flags, action source identification, and complete referrer tracking. Created captureUserData() function to collect user information from forms for improved Facebook conversion matching and attribution accuracy.

## User Preferences

Preferred communication style: Simple, everyday language.