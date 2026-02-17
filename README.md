# Portfolio Website (Next.js + MDX)

Modern, customizable portfolio for software, mechanical engineering, and research projects.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (v4)
- MDX content (filesystem-based)
- `next/image` for all images
- Framer Motion (subtle transitions)
- `lucide-react` icons
- Vercel-friendly static-compatible setup

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Project structure

- `app/` routes: Home, Projects, Project Detail, Experience, Resume, About
- `content/projects/*.mdx` project content with frontmatter
- `components/` reusable UI + MDX components
- `lib/projects.ts` MDX content loader and sort helpers
- `public/placeholders/` placeholder images
- `public/resume.pdf` replaceable resume file

## Add a new project

1. Create a new file in `content/projects/your-project-slug.mdx`
2. Use this required frontmatter shape:

```mdx
---
title: "Project Title"
slug: "project-slug"
date: "2026-01-01"
category: "Mechanical Engineering" # or "Software" or "Research"
featured: true
summary: "1-2 sentence summary"
impact: "Single punchy impact line"
tags: ["tag1", "tag2"]
heroImage: "/placeholders/project-1.svg"
links:
	github: "https://github.com/..."
	demo: "https://..."
	pdf: "/resume.pdf"
tools: ["Tool A", "Tool B"]
role: "Your role"
---
```

3. Include these sections in MDX body:
	 - `## Overview`
	 - `## Problem / Constraints`
	 - `## Approach`
	 - `## Results`
	 - `## Media`
	 - `## Lessons / Next Steps`

## MDX components available

- `Callout`
- `MetricCard`
- `ImageGallery`
- `TechTagList`

Example:

```mdx
<MetricCard label="Cycle Time" value="-32%" />
```

## Customization notes

- Name and social links: update `components/site-header.tsx` and `components/site-footer.tsx`
- Accent color and theme tokens: update CSS variables in `app/globals.css`
- Resume file: replace `public/resume.pdf`

## Build

```bash
npm run build
npm run start
```

