# Axiom Pulse Clone - Token Discovery Table

A pixel-perfect replica of [Axiom Trade's Pulse](https://axiom.trade/pulse) token discovery table, built with modern frontend technologies and best practices.


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2ee939e4-b9ef-4476-9b8e-6f3dadb9c006" />


# Youtube link : 
https://youtu.be/N2MblJpmdRk?si=09S7EQNSrLN0QR6M
## 📋 Project Overview

This project demonstrates a production-grade implementation of a real-time token discovery interface with:

- ✅ **Three-column layout** - New Pairs, Final Stretch, and Migrated tokens
- ✅ **Real-time price updates** - WebSocket simulation with green/red flash animations
- ✅ **Interactive components** - Popovers, tooltips, modals, and sorting
- ✅ **Responsive design** - Desktop (3-column) → Mobile (tab-based navigation)
- ✅ **Accessible UI** - Keyboard navigation, ARIA labels, Radix UI primitives

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | **Next.js 16** (App Router with Turbopack) |
| Language | **TypeScript** (Strict Mode) |
| Styling | **Tailwind CSS 4** |
| State Management | **Redux Toolkit** |
| Data Fetching | **TanStack Query** (React Query) |
| UI Components | **Radix UI** Primitives |
| Icons | **Lucide React** |

---

## 🏗 Architecture

The project follows **Atomic Design Pattern** for scalable component organization:

```
src/
├── components/
│   ├── atoms/          # 10 basic UI primitives (Avatar, Badge, Modal, Tooltip...)
│   ├── molecules/      # 4 component combinations (TokenCard, ColumnHeader...)
│   ├── organisms/      # 5 complex sections (PulseTable, TokenColumn, Header...)
│   └── providers/      # Context providers (Redux, React Query)
│
├── hooks/              # Custom hooks (useWebSocket, useTokens, useMediaQuery)
├── services/           # Mock API & WebSocket services
├── store/              # Redux slices (UI state, price directions)
├── types/              # TypeScript definitions (270+ lines)
└── utilities/          # Formatters, constants, mock data
```


---

## ✨ Key Features

### Token Discovery Table

| Column | Description |
|--------|-------------|
| **New Pairs** | Recently created tokens (0-5 minutes old) |
| **Final Stretch** | Tokens approaching migration (5-60 minutes) |
| **Migrated** | Successfully migrated tokens (1-24 hours) |

### Interactions

- **Tooltips** - Hover on badges and icons for contextual information
- **Modal** - Click any token card for expanded details
- **Sorting** - Sort columns by age, market cap, volume, or price
- **Hover Effects** - Smooth row highlighting with transitions
- **Copy Address** - One-click contract address copying

### Real-Time Updates

- Mock WebSocket updates 20-40% of tokens every 1.5 seconds
- **Green flash** on price increase, **Red flash** on price decrease
- Cell-level updates (optimized, no full re-renders)
- New tokens appear every 5 seconds with entry animation

### Loading States

- Shimmer/skeleton loading placeholders
- Progressive staggered row appearance
- Error boundary with retry functionality

---


---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher


# Install dependencies
npm install

# Start development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to view the application.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## ⚡ Performance Highlights

- **Memoization** - `React.memo()`, `useMemo()`, `useCallback()` throughout
- **Cell-level updates** - Only affected cells re-render on price changes
- **SSR-safe hooks** - Proper hydration handling for responsive layouts
- **Tree-shaking** - Selective Radix UI and Lucide imports
- **Auto-hiding scrollbars** - Custom CSS + JS for clean UX

---

## ♿ Accessibility

- ✅ Full keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels on all interactive elements
- ✅ Semantic HTML structure
- ✅ Focus visible indicators
- ✅ Screen reader friendly (Radix UI)


## 🧪 Note on Mock Services

This project uses **simulated data** for demonstration:

- `mockWebSocket.ts` - Simulates real-time price streams
- `mockData.ts` - Generates realistic token data
- `newTokenSimulator.ts` - Creates new tokens periodically

No actual blockchain API or WebSocket connections are required to run the application.

---

## 👤 Author

**Anshika Agarwal**

Built for the ** Frontend Developer Assessment**

---
