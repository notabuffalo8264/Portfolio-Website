"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Project, projectCategories } from "@/lib/types";
import { sortProjectsByFeatured } from "@/lib/project-sort";

type SortMode = "newest" | "featured";

type ProjectsBrowserProps = {
  projects: Project[];
};

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [category, setCategory] = useState<"All" | (typeof projectCategories)[number]>("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortMode>("newest");

  const filtered = useMemo(() => {
    const byCategory = category === "All" ? projects : projects.filter((project) => project.category === category);
    const byQuery = query.trim()
      ? byCategory.filter((project) => {
          const haystack = `${project.title} ${project.tags.join(" ")}`.toLowerCase();
          return haystack.includes(query.toLowerCase());
        })
      : byCategory;

    return sortBy === "newest" ? byQuery : sortProjectsByFeatured(byQuery);
  }, [category, projects, query, sortBy]);

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {["All", ...projectCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item as typeof category)}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                category === item
                  ? "border-accent bg-accent text-white"
                  : "border-border bg-surface hover:bg-surface-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            aria-label="Search projects"
            placeholder="Search by title or tags"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-sm md:w-64"
          />
          <select
            aria-label="Sort projects"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortMode)}
            className="rounded-xl border border-border bg-surface px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="featured">Featured</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
