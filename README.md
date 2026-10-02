# OmniWeb OS — A Web-Based Mobile Operating System Simulator

**Built by [Girish Lade](https://ladestack.in)**

OmniWeb OS is a feature-rich, simulated mobile operating system that runs entirely in your web browser. Built with **Next.js** and **React**, it showcases a beautiful, functional mobile UI crafted with **Tailwind CSS** and **ShadCN UI** components, plus AI-powered app recommendations via **Genkit** (Gemini).

## ✨ Key Features

- **📱 Realistic OS Interface** — home screen, app icons, dock, status bar, on-screen Back / Home / Recents navigation
- **🖼️ Stunning Visuals** — sleek modern design with light and dark themes
- **🤖 AI-Powered App Recommendations** — Genkit + Gemini suggests apps based on usage patterns (requires `GEMINI_API_KEY`)
- **📂 Built-in Apps**:
  - Browser — surf the web inside the OS
  - Messages — messaging app mock-up
  - Gallery — browse a curated image collection
  - Settings — dark mode toggle, preferences, AI features
  - Calculator — fully functional
  - Notes — saves thoughts to localStorage
  - Weather — 5-day forecast for a sample city
  - Terminal — mock terminal with basic commands
- **🔗 Social Shortcuts** — quick-launch apps linking to social profiles
- **🖥️ Fullscreen Apps** — immersive full-screen app windows

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router), React 18
- **Styling:** Tailwind CSS 3.4, ShadCN UI (Radix primitives), tailwindcss-animate
- **AI:** Genkit 1.x with `@genkit-ai/googleai` (Gemini 2.5 Flash)
- **State/Forms:** React Hook Form + Zod, Embla Carousel, Recharts, date-fns
- **Language:** TypeScript

## 🚀 Quick Start

### Prerequisites

Node.js 18+ and npm.

### Installation

```bash
git clone https://github.com/girishlade111/OmniWeb.git
cd OmniWeb
npm install --legacy-peer-deps
```

### Environment Variables

The AI recommendations feature needs a Google AI (Gemini) key:

```bash
GEMINI_API_KEY=your-google-ai-key   # or GOOGLE_API_KEY
```

Without the key, the OS shell and all built-in apps work — only the AI suggestions button will error gracefully.

### Run

```bash
npm run dev      # dev server on http://localhost:9002 (Turbopack)
npm run build    # production build
npm start        # serve production build
```

## 📁 Project Structure

```
src/
├── ai/
│   ├── genkit.ts            # Genkit + Google AI (Gemini 2.5 Flash) setup
│   └── flows/
│       └── ai-powered-app-recommendations.ts   # "use server" flow
├── app/
│   ├── layout.tsx
│   └── page.tsx             # OS entry
├── components/
│   ├── os/                  # OS shell: home screen, dock, status bar, apps
│   └── ui/                  # ShadCN UI primitives
├── hooks/
├── lib/
└── types/
docs/
└── blueprint.md             # original design blueprint
```

## 🚢 Deployment

This is a **dynamic** Next.js app (server actions + Genkit). It cannot be statically exported as-is.

- **Recommended:** Netlify or Vercel with Node runtime; set `GEMINI_API_KEY` in the environment.
- The Genkit flow runs server-side — keep the serverless/Node runtime enabled.

## 🤝 Author

**Built by Girish Lade** — https://ladestack.in

Free to use and fork. Contributions welcome.
