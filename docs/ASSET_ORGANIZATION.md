# Asset & File Organization Guide

Use this structure for all future portfolio content.

## Public assets

```text
public/
  projects/
    <project-slug>/
      images/
        hero.webp
        gallery-01.webp
      videos/
        demo.mp4
      downloads/
        project-slug-report.pdf
        project-slug-slides.pdf
        project-slug-source.zip
  images/
    profile/
      profile.svg
  downloads/
    resume/
      christopher-kopiwoda-resume.pdf
```

## What goes where

- `public/projects/<project-slug>/images/`: all images for that project (hero + gallery).
- `public/projects/<project-slug>/videos/`: all project videos or demos.
- `public/projects/<project-slug>/downloads/`: all downloadable files for that project.
- `public/images/profile/`: profile/headshot image used on About page.
- `public/downloads/resume/`: your main resume PDF.

## Naming conventions

- Use lowercase kebab-case filenames.
- Avoid spaces and special characters.
- Keep extensions explicit (`.webp`, `.png`, `.pdf`, `.zip`).

### Recommended patterns

- Project root: `public/projects/<project-slug>/`
- Hero image: `public/projects/<project-slug>/images/hero.webp`
- Gallery image: `public/projects/<project-slug>/images/gallery-01.webp`
- Project video: `public/projects/<project-slug>/videos/demo.mp4`
- Project downloads folder: `public/projects/<project-slug>/downloads/`
- Project download files:
  - `<project-slug>-report.pdf`
  - `<project-slug>-slides.pdf`
  - `<project-slug>-source.zip`

## MDX frontmatter examples

```mdx
heroImage: "/projects/thermal-fin-analysis-toolkit/images/hero.webp"
links:
  github: "https://github.com/your-handle/repo"
  demo: "https://your-demo-url.com"
  pdf: "/projects/thermal-fin-analysis-toolkit/downloads/thermal-fin-analysis-toolkit-report.pdf"
```

## Resume path used by site

The Resume page uses:

`/downloads/resume/christopher-kopiwoda-resume.pdf`

To update your resume, replace this file with the same name.
