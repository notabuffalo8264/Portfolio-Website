You are an expert frontend engineer and UI designer. Build me a high-quality, modern, highly-customizable portfolio website using Next.js.

GOALS
- Looks premium and professional (software + mechanical engineering + research portfolio).
- Highly customizable and easy to extend.
- Fast, responsive, accessible, and clean.
- Built so I can add/edit projects by editing markdown/MDX files (no database).
- Use best practices for SEO and performance.

TECH STACK (REQUIRED)
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- MDX for project pages
- next/image everywhere for images
- Framer Motion for subtle page transitions and hover animations (minimal, tasteful)
- lucide-react icons
- Vercel-friendly (no server requirements)

SITE MAP / NAV
Top nav:
- Home
- Projects
- Experience
- Resume
- About
Footer:
- Email (mailto), GitHub, LinkedIn
- Copyright

ROUTES
1) "/" Home
- Hero section: name, one-line positioning statement (ME design + software + research)
- 2 buttons: "View Projects" and "Download Resume"
- Featured Projects section (6 cards pulled automatically from project metadata)
- Skills snapshot (ME tools + software tools)
- Simple contact CTA

2) "/projects" Projects index
- Displays all projects as cards
- Filter tabs/buttons: Mechanical Engineering, Software, Research
- Search box (client-side) to filter by title/tags
- Sort: newest first by default; allow "Featured" sort
- Each card shows: thumbnail image, title, 1-line impact, tags, date
- Click -> project detail page

3) "/projects/[slug]" Project detail page (MDX-driven)
- Layout: title, date, tags, category, hero image
- Sticky sidebar on desktop with: role, tools, links (GitHub/demo/PDF)
- Main content from MDX with headings:
  - Overview
  - Problem / Constraints
  - Approach
  - Results (include metrics)
  - Media (gallery)
  - Lessons / Next Steps
- Provide MDX components: Callout, MetricCard, ImageGallery, TechTagList

4) "/experience" Extended experience page (web-native, not a PDF)
- Sections:
  - Professional Experience (timeline style)
  - Major Projects (links into project pages)
  - Research Experience
  - Leadership / Activities
- Each entry has: role, org, dates, bullets, links

5) "/resume" Resume page
- Embedded 1-page resume PDF viewer (or simple link + fallback)
- Prominent download button
- Make it easy to replace the PDF file in /public

6) "/about" About page
- Short bio
- What roles I’m looking for
- Skills grouped:
  - Mechanical (CAD/FEA/manufacturing/thermal/etc.)
  - Software (backend, automation, etc.)
  - Research (materials, lab work, etc.)
- Small photo placeholder

CONTENT MODEL (IMPORTANT)
All projects are stored in /content/projects/*.mdx with frontmatter:
- title
- slug
- date (YYYY-MM-DD)
- category: "Mechanical Engineering" | "Software" | "Research"
- featured: true/false
- summary (1–2 lines)
- impact (single punchy line)
- tags (array)
- heroImage (path under /public)
- links: { github?, demo?, pdf? }
- tools (array)
- role (string)

Create 9 SAMPLE PROJECTS (placeholders with realistic tags and summaries):
- 3 Mechanical Engineering
- 3 Software
- 3 Research
Use placeholder names like:
- "Optical Floating Zone Furnace Ampule Growth Fixture" (Research/ME hybrid but pick ONE primary category; use tags for cross-discipline)
- "HOA Manager Automation Backend" (Software)
- "Thermal Fin Analysis Toolkit" (Software or ME; pick one)
- "Mechanism Design: Key-Turn Assist Prototype" (Mechanical Engineering)
etc.
Include sample MDX body content with headings and a few images (use placeholder images under /public/placeholders).

DESIGN SYSTEM
- Clean typography, lots of whitespace, strong hierarchy.
- Light mode by default; include dark mode toggle (class-based Tailwind).
- Accent color variable (easy to change).
- Cards: subtle shadow, hover lift, consistent border radius.
- Make the site look good on mobile first.

SEO / QUALITY
- Proper metadata (title templates, OpenGraph, Twitter cards).
- Sitemap generation if simple; otherwise good defaults.
- Accessible components (keyboard nav, focus styles, aria labels).
- Performance: avoid heavy JS; animations should be subtle.

IMPLEMENTATION REQUIREMENTS
- Provide the full folder structure and all files needed.
- Use a project content loader that reads MDX files at build time (no external CMS).
- Implement tag filtering/search on the Projects page.
- Make sure categories are EXACT strings:
  - "Mechanical Engineering"
  - "Software"
  - "Research"

DELIVERABLE
- A working Next.js repo with:
  - All pages and routing
  - MDX pipeline
  - Sample content
  - Tailwind theme + dark mode
  - Reusable components
  - README with setup instructions and how to add a new project
- The project should run with:
  - npm install
  - npm run dev

ASSUME
- My name will be filled in later; use placeholder "Christopher Kopiwoda" as default.
- Provide placeholders for GitHub/LinkedIn/email.

DO NOT ASK ME QUESTIONS.
Make reasonable assumptions and implement.
