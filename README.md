# Axiom Pulse Clone - Token Discovery Table

A pixel-perfect replica of [Axiom Trade's Pulse](https://axiom.trade/pulse) token discovery table, built with modern frontend technologies and best practices.

![Axiom Pulse Clone Desktop](./public/screenshots/screenshot-desktop-1920.png?v=2)

## 🔗 Links

| Resource | Link |
|----------|------|
| **Live Demo** | [https://token-trading-table-el-task.vercel.app](https://token-trading-table-el-task.vercel.app) |
| **Video Demo** | [YouTube Walkthrough](https://www.youtube.com/watch?v=Eg82OxRYJgQ&t=6s) |
| **Design Decisions** | [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) |

---

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

> 📖 For detailed architecture decisions, see **[DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md)**

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

## 📱 Responsive Design

| Breakpoint | Layout |
|------------|--------|
| ≥1024px | Three-column grid |
| <1024px | Tab-based single column |

### Desktop View (1920px)
![Desktop View](./public/screenshots/screenshot-desktop-1920.png?v=2)

### Tablet View (768px)
![Tablet View](./public/screenshots/screenshot-tablet-768.png?v=2)

### Mobile View (375px)
![Mobile View](./public/screenshots/screenshot-mobile-375.png?v=2)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Ankitg-713/Token-Trading-Table---EL-Task.git

# Navigate to project directory
cd Token-Trading-Table---EL-Task

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

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [DESIGN_DECISIONS.md](./DESIGN_DECISIONS.md) | Detailed explanation of architecture, state management, component design, and technical decisions |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Pre-deployment and post-deployment verification checklist |

---

## 🧪 Note on Mock Services

This project uses **simulated data** for demonstration:

- `mockWebSocket.ts` - Simulates real-time price streams
- `mockData.ts` - Generates realistic token data
- `newTokenSimulator.ts` - Creates new tokens periodically

No actual blockchain API or WebSocket connections are required to run the application.

---

## 👤 Author

**Ankit Kumar Gupta**

Built for the **EternaLabs Frontend Developer Assessment**

---

## 📄 License

This project is for educational/assessment purposes only. Not affiliated with Axiom Trade.
