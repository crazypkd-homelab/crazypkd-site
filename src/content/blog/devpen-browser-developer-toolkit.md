---
title: "I Built a Developer Toolkit That Does Not Talk to a Server"
description: "DevPen is a zero-infrastructure browser toolbox — 8 utilities, no backend, no accounts, full offline support. Built with React 19, TypeScript 6, Vite 8, and CodeMirror 6."
date: 2026-05-08
tags: ["devtools", "react", "typescript", "pwa", "browser"]
---

Most developer toolkits ship a backend. User accounts, databases, API gateways — infrastructure that costs money, needs maintenance, and introduces a trust boundary between your data and someone else's server. DevPen takes the opposite approach: every line of code runs in your browser. There is no server.

## The Tools

DevPen bundles 8 utilities into a single PWA:

- **Markdown Viewer** — live-rendered preview with syntax-highlighted source view
- **JSON Formatter** — format, minify, validate, and tree-navigate arbitrary JSON
- **Diff Checker** — side-by-side text comparison with insert/delete highlighting
- **Encode/Decode** — Base64, URL encoding, hex, HTML entities, and Unicode escapes
- **JWT Debugger** — decode header and payload, inspect claims, detect expiration
- **Regex Tester** — interactive pattern matching with flag toggles and match groups
- **Case Converter** — lower, UPPER, Title, camel, Pascal, snake, kebab, constant
- **Line Tools** — sort, deduplicate, shuffle, reverse, trim, and filter

All eight tools share CodeMirror 6 as the editor surface, so you get proper syntax highlighting, bracket matching, and keybindings everywhere without any tool-specific integration work.

## Architecture Decisions

The core constraint was simple: nothing leaves the browser. No analytics, no telemetry, no CDN calls at runtime. The entire app is a static bundle served from Cloudflare Pages.

State persistence uses `SessionStorage` per tool — close the tab, lose the state. That is intentional. There is nothing to save because there is nothing to leak.

Theme support covers light, dark, and system-preference modes via TailwindCSS 4's `dark` variant with a `prefers-color-scheme` media query fallback. The theme toggle writes to `localStorage` so it survives sessions, but that is the only persistent key.

The PWA manifest and service worker make the entire toolkit available offline. Once loaded, you can kill your network connection and every tool still works — formatters, diffing, JWT inspection, all of it.

## Stack

React 19 with TypeScript 6 under strict mode. Vite 8 for the build pipeline — HMR during development, code-splitting and preload directives in production. TailwindCSS 4 for styling with the new CSS-first configuration. CodeMirror 6 via `@codemirror/view` and language packs loaded per tool context.

The result is a ~180 KB gzipped bundle that does everything with no backend, no accounts, and no data exfiltration. You can try it at [devpen.crazypkd.com](https://devpen.crazypkd.com/).
