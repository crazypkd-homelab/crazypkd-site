---
title: "Building a Multi-Cloud Monitoring Dashboard That Runs in a Single Container"
description: "CrazyHub is a self-hosted dashboard that unifies AWS, Azure, GCP, and Cloudflare resource monitoring into one view — no external DB, no complex orchestration."
date: 2026-05-01
tags: ["cloud", "monitoring", "docker", "nextjs", "homelab"]
---

Managing resources across multiple cloud providers means juggling separate consoles, different APIs, and inconsistent visibility. CrazyHub is my answer to that — a self-hosted monitoring dashboard that pulls everything into a single pane of glass.

## Why It Exists

I run workloads across AWS, Azure, GCP, and Cloudflare. Jumping between four dashboards to check instance states, DNS records, or cost anomalies gets old fast. Existing tools are either SaaS products I do not want to depend on, or they require a full monitoring stack — Prometheus, Grafana, external databases — that I did not want to maintain for a side project. CrazyHub takes the opposite approach: one container, zero external dependencies.

## Architecture

The entire application ships as a single Docker image. SQLite runs embedded inside the container via Prisma, so there is no database to provision or back up separately. No Redis. No message queue. Just the container and a volume mount for persistent data.

Provider integrations follow a plug-and-play pattern. Each cloud — AWS, Azure, GCP, Cloudflare — implements a common interface. Adding a new provider means dropping in a module that handles authentication, data fetching, and normalization. No changes to the core dashboard.

Credentials are encrypted at rest using AES-256-GCM before hitting the SQLite store. The encryption key lives outside the database, so a DB dump alone reveals nothing usable.

An auto-sync scheduler runs inside the container, periodically refreshing resource states from each connected provider. Sync intervals are configurable per provider to respect API rate limits.

## Current State

CrazyHub is deployed locally in my homelab and actively evolving. The tech stack is Next.js 16 for the UI layer, Prisma for database access, AWS SDK for S3 interactions, and Docker for the deployment artifact. The codebase stays intentionally small — no over-engineered abstractions, no premature scaling decisions.

The immediate roadmap includes alert thresholds, cost trend visualizations, and resource dependency graphs. Long-term, I want to explore event-driven sync mechanisms so the dashboard reflects changes in near real-time rather than on a timer.

If this sounds like something you would use, the repo will go public once the first stable release is cut.
