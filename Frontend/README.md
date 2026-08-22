# Project Monitor AI — Frontend Client

This is the React client application for **Project Monitor AI**. It provides an interactive interface for real-time monitoring of AI-powered developer operations, real-time board sync, and automated audits.

## 🛠️ Tech Stack & Tools Setup

The frontend has been initialized using **Vite + React + TypeScript** with the following production-grade packages:

- **State Management & Routing**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) & React Router (`react-router-dom`)
- **API Client**: Axios (`axios`) for custom requests and query integration
- **Real-Time Synchronisation**: Pusher (`pusher-js`) to interface with the server's event dispatcher
- **Forms & Data Validation**: React Hook Form (`react-hook-form`), @hookform/resolvers, and Zod (`zod`)
- **Visuals & Animations**: Recharts (`recharts`) for live metric graphs, Framer Motion (`framer-motion`) for micro-interactions, and `@hello-pangea/dnd` for smooth Kanban drag-and-drop operations
- **Styling**: Tailwind CSS v4 (`tailwindcss`, `@tailwindcss/vite`)

---

## ⚡ Integration Details & Architecture

### 1. API Reverse-Proxy Integration
To allow the frontend client to communicate seamlessly with the local backend service during development (preventing CORS issues and simplifying local routes), the Vite configuration registers a secure API proxy mapping `/api` to the backend URL via environment variables:

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL,  // local backend dev port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
```

### 2. Typographic Identity & Custom Theme Engine
Tailwind CSS v4 configures its themes directly inside the CSS entrypoint. We have declared a custom theme system using modern typography (`Syne` for display accents, `DM Sans` for content, and `DM Mono` for interactive/code segments) alongside semantic HSL colors mapped dynamically for dark and light views:

```css
/* index.css */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
@import "tailwindcss";

theme inline {
  --font-display: 'Syne', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-mono:    'DM Mono', monospace;
  --color-cyan:    #00D4FF;
  --color-teal:    #0D9488;
  --color-violet:  #8B5CF6;
  --color-emerald: #10B981;
  --color-amber:   #F59E0B;
  --color-rose:    #F43F5E;
  --color-indigo:  #6366F1;
  --color-bg-base:    #080C14;
  --color-bg-surface: #0D1521;
  --color-bg-card:    #0F1B2D;
  --color-text-primary:   #E8F0FF;
  --color-text-secondary: #7A8BA8;
  --color-text-muted:     #3D5070;
  --color-border:    rgba(255,255,255,0.06);
  --color-border-md: rgba(255,255,255,0.10);
}

[data-theme="light"] {
  --color-bg-base:    #F7F5F2;
  --color-bg-surface: #FFFFFF;
  --color-bg-card:    #FFFFFF;
  --color-text-primary:   #1A2035;
  --color-text-secondary: #5A6780;
  --color-border:    rgba(0, 0, 0, 0.07);
}
```

### 3. Modular Axios Base Query
To leverage **RTK Query** while retaining Axios' interceptors and custom lifecycle management, the client exports a unified `axiosBaseQuery` client.
* Integrates `VITE_API_URL` environment variables dynamically.
* Forces `withCredentials: true` globally to allow stateful cookie exchanges (e.g. JWT session verification checks).

```ts
// src/lib/axiosBaseQuery.ts
import axios from "axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const axiosBaseQuery: BaseQueryFn = async ({ url, method, data, params }) => {
    try {
        const result = await axiosInstance({
            url,
            method,
            data,
            params
        })
        return { data: result.data }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                error: {
                    status: error.response?.status,
                    data: error.response?.data
                }
            }
        }
        return {
            error: {
                status: 500,
                data: 'An unexpected error occurred'
            }
        }
    }
}

export default axiosBaseQuery;
```
