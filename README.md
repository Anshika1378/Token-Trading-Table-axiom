# Axiom Pulse Clone - Token Discovery Table

A pixel-perfect replica of [Axiom Trade's Pulse](https://axiom.trade/pulse) token discovery table, built with modern frontend technologies and best practices.

![Axiom Pulse Clone Desktop](./public/screenshots/screenshot-desktop-1920.png?v=2)

## 🚀 Live Demo

- **Deployment**: [Your Vercel URL Here]
- **YouTube Demo**: [Your YouTube URL Here]

## 📋 Project Overview

This project is a production-grade implementation of a real-time token discovery interface, featuring:

- **Three-column layout** for New Pairs, Final Stretch, and Migrated tokens
- **Real-time price updates** with smooth color transitions (green/red flash)
- **Interactive components** including popovers, tooltips, and modals
- **Accessible UI** with keyboard navigation and ARIA support
- **Responsive design** working down to 320px width with tab-based navigation

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS 4 |
| State Management | Redux Toolkit |
| Data Fetching | TanStack Query (React Query) |
| UI Components | Radix UI Primitives |
| Icons | Lucide React |

## 🏗 Architecture

### Atomic Design Structure

```
src/
├── components/
│   ├── atoms/          # Basic UI primitives (10 components)
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── IconButton.tsx
│   │   ├── Modal.tsx
│   │   ├── Popover.tsx
│   │   ├── PriceText.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── Skeleton.tsx
│   │   └── Tooltip.tsx
│   │
│   ├── molecules/      # Combinations of atoms (4 components)
│   │   ├── ColumnHeader.tsx
│   │   ├── TokenCard.tsx
│   │   ├── TokenCardSkeleton.tsx
│   │   └── TokenDetailsPopover.tsx
│   │
│   ├── organisms/      # Complex UI sections (5 components)
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx
│   │   ├── PulseTable.tsx
│   │   ├── TokenColumn.tsx
│   │   └── Toolbar.tsx
│   │
│   └── providers/      # Context providers
│       ├── QueryProvider.tsx
│       ├── ReduxProvider.tsx
│       └── index.tsx
│
├── hooks/              # Custom React hooks
│   ├── useMediaQuery.ts    # SSR-safe responsive hook
│   ├── useNewTokenSimulator.ts
│   ├── useTokens.ts        # React Query hooks
│   ├── useWebSocket.ts     # Real-time updates
│   └── index.ts
│
├── services/           # API and WebSocket services
│   ├── api.ts              # Mock API service
│   ├── mockWebSocket.ts    # Simulated price streams
│   └── newTokenSimulator.ts
│
├── store/              # Redux store
│   ├── slices/
│   │   ├── priceSlice.ts   # Price directions for flash animations
│   │   └── uiSlice.ts      # UI state (tabs, modals, sorting)
│   └── index.ts
│
├── types/              # TypeScript definitions (270+ lines)
│   └── index.ts
│
├── utilities/          # Helper functions
│   ├── constants.ts
│   ├── formatters.ts
│   └── mockData.ts
│
└── lib/
    └── utils.ts        # cn() utility for classnames
```

### State Management Strategy

**Redux Toolkit** manages:
- UI state (active tab, sort config, modals, hover states)
- WebSocket connection status
- Real-time price update directions (for flash animations)

**React Query** handles:
- Token data fetching with `useQuery`
- Cache management with `queryClient.setQueryData`
- Optimistic updates for real-time price changes

## ✨ Features

### 1. Token Discovery Table

| Column | Description |
|--------|-------------|
| **New Pairs** | Recently created tokens (0-5 minutes old) |
| **Final Stretch** | Tokens approaching migration (5-60 minutes) |
| **Migrated** | Successfully migrated tokens (1-24 hours) |

### 2. Interactions

| Interaction | Description |
|-------------|-------------|
| **Tooltip** | Hover on icons for hints (Radix UI) |
| **Modal** | Click token card for expanded details |
| **Sorting** | Sort by age, market cap, volume, price |
| **Hover Effects** | Row highlight with smooth transitions |
| **Presets** | P1, P2, P3 preset filter buttons |
| **Copy Address** | Click copy icon to copy contract address |

### 3. Real-Time Updates

- Mock WebSocket updates **20-40% of tokens** every 1.5 seconds
- **Green flash** animation on price increase
- **Red flash** animation on price decrease
- Cell-level updates (no full table re-renders)
- Token age increments every second

### 4. Loading States

- **Shimmer effect**: Animated loading placeholders
- **Skeleton loading**: Static placeholders
- **Progressive loading**: Staggered row appearance
- **Error boundary**: Graceful failure recovery with retry

### 5. New Token Simulation

- New tokens appear every 5 seconds
- Entry animation with green glow effect
- Weighted distribution (60% New Pairs, 25% Final Stretch, 15% Migrated)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/axiom-pulse-clone.git

# Navigate to project directory
cd axiom-pulse-clone

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Available Scripts

```bash
npm run dev      # Start development server (Turbopack)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## ⚡ Performance Optimizations

### Techniques Used

1. **Memoization**
   - `React.memo()` on all components
   - `useMemo()` for derived/sorted token lists
   - `useCallback()` for event handlers

2. **Render Optimization**
   - Cell-level price updates via Redux selectors
   - `usePriceDirection(tokenId)` hook for individual subscriptions
   - No layout shifts on data updates

3. **SSR Safety**
   - `useMediaQuery` hook handles hydration correctly
   - No window/document access during SSR

4. **Bundle Optimization**
   - Tree-shaking enabled
   - Radix UI primitives (no full component library)
   - Lucide icons with selective imports

### Lighthouse Scores

| Metric | Target | Status |
|--------|--------|--------|
| Performance | ≥90 | ⬜ Pending |
| Accessibility | ≥90 | ⬜ Pending |
| Best Practices | ≥90 | ⬜ Pending |
| SEO | ≥90 | ⬜ Pending |

> Run `npx lighthouse http://localhost:3000 --view` to generate report

## 📱 Responsive Design

The application is fully responsive with two layout modes:

| Breakpoint | Layout |
|------------|--------|
| ≥1024px (Desktop) | Three-column grid layout |
| <1024px (Mobile/Tablet) | Tab-based single column |

### Screenshots

#### Desktop View (1920px) - Three Column Layout
![Desktop View](./public/screenshots/screenshot-desktop-1920.png?v=2)

#### Tablet View (768px) - Three Column (compact)
![Tablet View](./public/screenshots/screenshot-tablet-768.png?v=2)

#### Mobile View (375px) - Tab Navigation
![Mobile View](./public/screenshots/screenshot-mobile-375.png?v=2)

## ♿ Accessibility

- ✅ Full keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels on all interactive elements
- ✅ Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
- ✅ Focus visible indicators (`:focus-visible`)
- ✅ Screen reader friendly (Radix UI primitives)
- ✅ Color contrast compliance

## 📦 Deployment Checklist

### Pre-Deployment

- [ ] Run `npm run build` successfully
- [ ] Run `npm run lint` with no errors
- [ ] Test all breakpoints (320px, 768px, 1024px, 1920px)
- [ ] Verify modal opens/closes correctly
- [ ] Check real-time price updates are working
- [ ] Run Lighthouse audit ≥90 on all metrics

### Vercel Deployment

```bash
# Option 1: Vercel CLI
npm i -g vercel
vercel

# Option 2: GitHub Integration
# 1. Push to GitHub
# 2. Connect repo in Vercel dashboard
# 3. Deploy automatically
```

### Post-Deployment

- [ ] Update README with Vercel URL
- [ ] Record 1-2 minute YouTube demo showing:
  - [ ] Three-column desktop layout
  - [ ] Tab navigation on mobile
  - [ ] Real-time price updates with color flashes
  - [ ] Modal opening/closing
  - [ ] Hover interactions
  - [ ] New token appearing
- [ ] Update README with YouTube URL
- [ ] Final commit with all URLs

## 🎬 YouTube Demo Script (1-2 min)

1. **Intro** (10s): "This is my Axiom Pulse clone built with Next.js and TypeScript"
2. **Desktop Layout** (20s): Show 3-column layout, scroll through tokens
3. **Real-time Updates** (15s): Point out price changes and color flashes
4. **Interactions** (30s): Click token → modal, hover effects, tooltips
5. **Responsive** (20s): Resize browser to show tab view on mobile
6. **Code Quality** (15s): Quick scroll through atomic components structure
7. **Outro** (10s): "Built with React Query, Redux Toolkit, and Radix UI"

## 🧪 Testing Notes

The project uses mock data and services for development:

- `mockWebSocket.ts` - Simulates WebSocket price streams
- `mockData.ts` - Generates realistic token data
- `newTokenSimulator.ts` - Creates new tokens periodically

No actual API or WebSocket connections are required.

## 📄 License

This project is for educational purposes only. Not affiliated with Axiom Trade.

## 🙏 Acknowledgments

- [Axiom Trade](https://axiom.trade) for design inspiration
- [Radix UI](https://radix-ui.com) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com) for utility-first styling
- [Lucide](https://lucide.dev) for beautiful icons

---

Built with ❤️ for the EternaLabs Frontend Assessment
