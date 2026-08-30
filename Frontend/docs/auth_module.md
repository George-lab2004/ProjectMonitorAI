# Project Monitor AI — Auth Module & UI Architecture

## 📌 Overview

The **Auth Module** provides a high-performance split-screen authentication experience for **Project Monitor AI**. It features a fixed branding sidebar with high-impact typography, a custom 3D AI Constellation Orb background, ambient glowing aura layers, interactive live activity cards, and a theme toggle system.

---

## 🎨 1. Split-Screen Layout Architecture (`AuthLayout.tsx`)

The authentication module is built around a reusable layout container (**`AuthLayout.tsx`**) that keeps the branding panel static while switching between auth forms dynamically.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                         AuthLayout (min-h-screen flex)                 │
│  ┌──────────────────────────────────┬───────────────────────────────┐  │
│  │   LEFT SIDE (Fixed Branding)     │    RIGHT SIDE (Dynamic)      │  │
│  │                                  │                               │  │
│  │  • 3D AI Tech Orb SVG Background │          <Outlet />           │  │
│  │  • Ambient Glowing Light Orbs    │   (Renders Login, Register,   │  │
│  │  • High-Impact Typography        │    or Password Reset forms)   │  │
│  │  • Live AI Activity Cards        │                               │  │
│  └──────────────────────────────────┴───────────────────────────────┘  │
│  Floating Top-Right: <ThemeToggle /> (Toggles & Persists Dark/Light)   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🌐 2. Visual Layering & SVG Engine

To ensure background visuals never interfere with text readability or form interaction, elements are structured using z-index layers:

### A. Layering Structure:
1. **Parent Container**: `relative overflow-hidden` clips any off-screen glow effects.
2. **Background Effects Layer (`absolute z-0 pointer-events-none`)**:
   - **3D AI Constellation Orb**: 750px SVG rendering curved latitude and longitude arcs (`<ellipse>`), glowing radial gradients, and pulsing neural node points (`animate-pulse`).
   - **Ambient Light Orbs**: `bg-cyan-400/40` and `bg-teal-400/30` blurred circles (`blur-2xl`) creating soft glowing energy in the corners.
3. **Foreground Content Layer (`relative z-10`)**:
   - Houses the Logo (`Project Monitor AI - Team Intelligence Platform`), Hero text (`Your team, focused every day`), and Live Activity Cards safely above the glow.

---

## 📊 3. Live AI Activity Feed Cards

The left sidebar displays 3 real-time simulation cards built with frosted glassmorphism (`bg-white/5 backdrop-blur-md border border-white/10`):

1. **Critical Deadline Risk Alert**: Red-themed card displaying AI-flagged project delay risks.
2. **Task Completion Badge**: Green-themed card displaying real-time task status updates.
3. **Automated AI Scan Report**: Cyan-themed card displaying morning AI team diagnostic scans.

Cards include micro-hover animations (`transition-all hover:translate-x-1`) for tactile visual feedback.

---

## 🌓 4. Dark Mode & Theme System (`ThemeToggle.tsx`)

Dark mode is controlled via a standalone component mounted in the top-right corner (`absolute top-5 right-5 z-50`):

* **Attribute Control**: Toggles the `data-theme="dark"` / `data-theme="light"` attribute on the `<html>` root element.
* **Storage Persistence**: Saves user preference in `localStorage` (`theme` key).
* **Token System**: Uses Tailwind CSS v4 custom theme tokens mapped in `index.css` (`--color-bg-base`, `--color-text-primary`, `--color-border`).

---

## 🔄 5. Route Integration (`main.tsx`)

Auth routes are nested under `AuthLayout` using React Router's `<Route>` syntax:

```tsx
<Route element={<AuthLayout />}>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Route>
```

When a user visits `/login` or `/register`, React Router renders `AuthLayout` first and injects the corresponding form component inside the right side's `<Outlet />`.
