# Project MDX Guide

Use one file per project:

- `content/projects/<project-slug>.mdx`

---

## 1) What is strict vs flexible

### Strict (must follow)

- File location: `content/projects/`
- Extension: `.mdx`
- Frontmatter fields (required):
  - `title`
  - `slug`
  - `date` (`YYYY-MM-DD`)
  - `category` (`Mechanical Engineering` | `Software` | `Research`)
  - `featured` (`true` | `false`)
  - `summary`
  - `tags` (array)
  - `heroImage`

### Flexible (you can structure however you want)

- Section headings and order
- Storytelling style (narrative, timeline, bullets, hybrid)
- Whether links/tools appear in body sections
- Which MDX components you use

---

## 2) Frontmatter template (recommended)

```mdx
---
title: "Project Title"
slug: "project-slug"
date: "2026-03-02"
# Optional: hide project from website when true
# inProduction: true
category: "Research"
featured: true
summary: "1-2 sentence summary used on cards and on the project page intro."
tags: ["tag-one", "tag-two", "tag-three"]
heroImage: "/projects/project-slug/images/hero.jpg"

# Optional hero controls
heroAspect: "16 / 9"
heroFit: "cover"          # "cover" or "contain"
heroPosition: "center 30%" # CSS object-position value
heroFrameless: false        # true = remove hero frame/border wrapper

# Optional project-card image controls (all-projects screen)
cardImageFit: "cover"            # "cover" or "contain"
cardImagePosition: "center center" # CSS object-position value

# Optional important links (rendered near top of project page)
# links:
#   github: "https://github.com/..."
#   devpost: "https://devpost.com/..."
#   demo: "https://..."
#   pdf: "/projects/project-slug/downloads/project-slug-report.pdf"
---
```

---

## 3) Hero image options (important)

You can control top image behavior per project:

- `heroAspect`: sets shape of hero container
  - Example: `"16 / 9"`, `"4 / 3"`, `"3 / 2"`
- `heroFit`: how image fills that shape
  - `cover` = fills area, may crop
  - `contain` = no crop, may letterbox
- `heroPosition`: focal point when using `cover`
  - Example: `"center center"`, `"center 20%"`, `"50% 30%"`
- `heroFrameless`: whether to remove the rounded hero frame/background wrapper
  - `true` = full-width frameless hero using the image aspect ratio
  - `false` (or omitted) = default framed hero

Good default for most projects:

- `heroAspect: "16 / 9"`
- `heroFit: "cover"`
- `heroPosition: "center center"`
- `heroFrameless: false`

Project cards on the all-projects screen can be controlled independently:

- `cardImageFit`: how the card thumbnail is rendered
  - `cover` = fill card area, may crop
  - `contain` = show full image, may letterbox
- `cardImagePosition`: thumbnail focal point when using `cover`
  - Use two values for clearer control, e.g. `"center 20%"`, `"50% 70%"`, `"left center"`

Optional top links (best for software projects):

- Use a `links` object in frontmatter.
- Supported common keys: `github`, `devpost`, `demo`, `pdf`.
- Any other link keys are also allowed and will render with auto-formatted labels.
- If `links` is omitted, nothing is shown.

Optional production-mode hide flag:

- `inProduction: true` hides a project from the website while keeping the file in the codebase.
- Default behavior (flag omitted) keeps projects visible.
- Only add this field when you want a project hidden.

---

## 4) File organization for project assets

Keep all project files under one project folder:

```text
public/projects/<project-slug>/
  images/
  videos/
  downloads/
```

Examples:

- Image: `/projects/project-slug/images/hero.jpg`
- PDF: `/projects/project-slug/downloads/project-slug-report.pdf`
- Video: `/projects/project-slug/videos/demo.mp4`

Resume is separate:

- `/downloads/resume/christopher-kopiwoda-resume.pdf`

---

## 5) Sectioning style (less strict)

You do **not** need fixed section names anymore.

Use headings that fit your project, e.g.:

- `## How This Started`
- `## Establishing a Growth Baseline`
- `## Timeline`
- `## Results So Far`
- `## Media & Documentation`
- `## Tools Used`
- `## Lessons / Where This Is Going`

The only requirement is that the page remains readable and structured.

---

## 6) Components you can use in MDX

Available MDX components:

- `Callout`
- `MetricCard`
- `ImageGallery`
- `ImageCarousel`
- `ImageSlideshow` (legacy; prefer `ImageCarousel`)
- `TechTagList`

### Example snippets

**Callout**

```mdx
<Callout title="Documentation Note">
Supporting plots and posters are provided as downloadable PDFs.
</Callout>
```

**Metrics**

```mdx
<div className="mt-4 grid gap-3 sm:grid-cols-3">
  <MetricCard label="Melting Threshold" value="40% Optical Power" />
  <MetricCard label="Primary Phase" value="86.9% Bi₂Se₃" />
  <MetricCard label="Secondary Phase" value="13.1% BiSe" />
</div>
```

**Arrow carousel (recommended for mixed image sizes)**

```mdx
<ImageCarousel imagesJson='[
  {"src":"/projects/project-slug/images/hero.jpg","alt":"Main image"},
  {"src":"/projects/project-slug/images/setup.jpg","alt":"Setup"}
]' />
```

---

## 7) PDF links that open in a new tab

Use HTML anchors in MDX when you want guaranteed new-tab behavior:

```mdx
<a href="/projects/project-slug/downloads/project-slug-report.pdf" target="_blank" rel="noreferrer">
  Project Report (PDF)
</a>
```

For filenames with spaces/special chars, URL-encode them in link paths:

- `UURAF Poster.pdf` → `UURAF%20Poster.pdf`
- `20%.jpg` → `20%25.jpg`

---

## 8) Current content behavior notes

- Project cards use **`summary`**, not impact.
- `impact`, `tools`, and `role` were removed from frontmatter.
- If you want tools displayed, add them in body sections (e.g. `## Tools Used`).
- Project-detail sidebar with role/tools/links has been removed.

---

## 9) Lightweight checklist before committing a project

- [ ] File is in `content/projects/` and named in kebab-case
- [ ] Frontmatter has required fields
- [ ] `slug` is unique
- [ ] `category` is exact allowed value
- [ ] `heroImage` path exists
- [ ] Any PDF/image links resolve to real files in that project folder
- [ ] Page renders in `npm run dev` and/or passes `npm run build`
