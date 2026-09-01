# SDB Connect — وصل

**From financing people to connecting an ecosystem.**

An AI-powered beneficiary ecosystem prototype built for the ImpactX Hackathon (AI & Emerging Technologies track), proposed for the Social Development Bank (SDB). This is a fully interactive frontend MVP — no backend, no real data, no external API key required. All AI behavior is simulated by a deterministic mock engine so the demo works reliably offline.

## Quick start

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (brand tokens defined in `src/index.css`)
- Framer Motion for animation
- Recharts for data visualization
- React Router for navigation
- Lucide for icons

No backend is required. State (role, language, connections, notifications) lives in `src/state/AppContext.tsx` and is persisted to `sessionStorage` so refreshing a page doesn't kick you back to the login screen.

## Project structure

```
src/
  types/            Shared TypeScript types
  data/              Mock/demo data (providers, beneficiary, ecosystem stats)
  lib/               AI engine, matching engine, financial engine, utils
  state/             Global app context (role, language, toasts, connections)
  components/
    ui/              Design-system primitives (Button, Card, Modal, ScoreRing…)
    layout/          Sidebar, mobile nav, app shell
    ai/              AI console, match cards, agentic flow, connection modal
    charts/          Recharts wrappers
    network/         Landing hero network viz + employee ecosystem map
    financial/       Budget optimizer
    story/           "From Beneficiary to Ecosystem" transformation visual
  pages/
    beneficiary/     Home, AI Assistant, Discover, My Network, Financial Copilot, Savings, Notifications, Provider Profile
    employee/        Overview, Ecosystem, Opportunities, AI Matches, Beneficiaries, Insights
```

## The mock AI layer

`src/lib/aiEngine.ts` and `src/lib/matchingEngine.ts` implement a fully deterministic, keyword-based "AI" so the demo never depends on network access or an API key:

- Detects service categories (marketing, packaging, technology, accounting…), budget ("under SAR 2,000"), and city from free text.
- Scores and ranks providers with human-readable "why this match" reasons.
- Distinguishes a normal matching request from an **agentic** request ("find me…", "connect me…") and runs an animated multi-step agent flow ending in a real "Ask AI to connect us" → connection-request simulation.
- Financial questions route to the Financial Copilot / Budget Optimizer instead of provider matches.

If you later want to wire in a real LLM, `interpretQuery()` in `src/lib/aiEngine.ts` is the single seam to swap out.

## Suggested live demo flow (~4–5 minutes)

1. **Landing** (`/`) — show the animated ecosystem network and pillars (Connect / Grow / Sustain).
2. **Login** (`/login`) — "Continue as Beneficiary."
3. **Home** — point out the AI insight card ("We found 6 opportunities…") and the financial health / savings snapshot.
4. **AI Assistant** — type *"I need someone to manage Instagram for my bakery"* → AI ranks providers with match scores and reasons (Noor Creative ≈ 92%).
5. Same screen, type *"Find me a marketing provider under SAR 2,000"* → watch the agentic step-by-step flow → click **Ask AI to connect us** → **Send connection** → success animation + "remind me in 3 days" toast.
6. **Financial Copilot** — walk through the health score, the "expenses increased 14%" insight, then scroll to the **AI Budget Optimizer** and drag a slider live to show savings/timeline updating in real time.
7. **Savings** — show the goal card and **Build my plan**.
8. Log out → **Continue as SDB Employee**.
9. **Overview** — ecosystem-wide stats (marked as simulated demo data).
10. **Opportunities** — AI Opportunity Engine, expand "Marketing" to show the demand/supply gap and AI insight.
11. **AI Matches** — "Potential Ecosystem Connections" (Sara's Kitchen → Noor Creative, 92%).
12. **Ecosystem** — click through categories on the ecosystem map.
13. Finish on **Insights**, scroll to "From Beneficiary to Ecosystem" for the closing visual.

## Notes on data & privacy

All beneficiary, provider, and ecosystem numbers are fictional demo data, clearly labelled "Demo data" / "Simulated demo data" wherever shown. The SDB Employee experience intentionally never exposes an individual beneficiary's private financial details — only aggregated, anonymized ecosystem metrics and public business-profile information, by design.
