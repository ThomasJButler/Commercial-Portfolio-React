# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Architecture

This is a React-based portfolio website built on Ryan Balieiro's React Portfolio Template. It uses a data-driven architecture with JSON configuration files and a multi-provider pattern for state management.

### Provider Hierarchy

The application wraps components in nested providers (src/main.jsx):
```
DataProvider → LanguageProvider → FeedbacksProvider → WindowProvider → ThemeProvider → GlobalStateProvider → App
```

### Core Components

**App.jsx Structure:**
- Fixed layout with AnimatedSection wrapper
- Navbar (desktop: fixed left, mobile: bottom)
- Main content area with ScrollContainer
- Footer section

**Data Flow:**
- All portfolio data loaded from `/public/data/sections/*.json`
- DataContext provides centralized data access
- Components consume data via `useData()` hook
- Language switching updates displayed strings dynamically

### Component Organization

- `/src/components/articles/` - Section components that compose the main content
- `/src/components/capabilities/` - HOCs adding functionality (Scrollable, Swipeable, Paginable, Categorizable)
- `/src/components/generic/` - Reusable UI components
- `/src/components/layout/` - Page structure components
- `/src/components/modals/` - Modal dialogs for projects/media
- `/src/components/forms/` - Form inputs and validation
- `/src/widgets/` - Complex UI features (Settings, LightSwitch, Navigator)

### Key Features

- **Multi-language**: Controlled by LanguageContext, switches between language keys in JSON
- **Theming**: Dark/light mode via ThemeContext and CSS variables
- **Responsive**: Mobile-first design with adaptive layouts
- **Smooth Scrolling**: Custom ScrollContainer with smooth-scrollbar
- **Contact Form**: EmailJS integration for direct email sending
- **Portfolio Gallery**: Filterable project showcase with modals

### Data Structure

JSON files in `/public/data/sections/` define:
- Profile information
- Section content and visibility
- Skills with proficiency levels
- Timeline events
- Portfolio projects with categories
- Service offerings
- Testimonials

Each section has `enabled` flag and `animation` settings for entrance effects.