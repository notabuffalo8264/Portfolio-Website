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
- `public/projects/<project-slug>/images/` per-project thumbnails + gallery images
- `public/projects/<project-slug>/videos/` per-project videos
- `public/projects/<project-slug>/downloads/` per-project downloadable files
- `public/images/profile/` about-page profile image
- `public/downloads/resume/christopher-kopiwoda-resume.pdf` resume file
- `docs/ASSET_ORGANIZATION.md` naming and organization guide
- `docs/PROJECT_MDX_GUIDE.md` exact project MDX creation guide

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
tags: ["tag1", "tag2"]
heroImage: "/projects/project-slug/images/hero.webp"
links:
	github: "https://github.com/..."
	demo: "https://..."
	pdf: "/projects/project-slug/downloads/project-slug-report.pdf"
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
- Resume file: replace `public/downloads/resume/christopher-kopiwoda-resume.pdf`
- Asset naming/placement rules: see `docs/ASSET_ORGANIZATION.md`
- New project authoring format: see `docs/PROJECT_MDX_GUIDE.md`

## Build

```bash
npm run build
npm run start
```

