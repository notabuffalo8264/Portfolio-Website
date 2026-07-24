"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { Project, projectCategories } from "@/lib/types";

type ProjectsBrowserProps = {
  projects: Project[];
};

export function ProjectsBrowser({ projects }: ProjectsBrowserProps) {
  const [category, setCategory] = useState<"All" | (typeof projectCategories)[number]>("All");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    return category === "All" ? projects : projects.filter((project) => project.category === category);
  }, [category, projects]);

  const categoryLabel = (item: typeof category) => item === "Mechanical Engineering" ? "Mechanical" : item;

  return (
    <section>
      <div className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Filter projects by category">
          {["All", ...projectCategories].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item as typeof category)}
              aria-pressed={category === item}
              className={`focus-ring relative rounded-sm py-2 text-sm transition ${
                category === item
                  ? "text-accent-bright"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {categoryLabel(item as typeof category)}
              {category === item && (
                <motion.span
                  layoutId="active-project-category"
                  className="absolute inset-x-0 bottom-0 h-px bg-accent"
                  transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={category}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: reduceMotion ? 0 : 0.04,
                staggerChildren: reduceMotion ? 0 : 0.045,
              },
            },
            exit: {
              opacity: 0,
              y: reduceMotion ? 0 : -8,
              transition: { duration: reduceMotion ? 0 : 0.16, ease: "easeIn" },
            },
          }}
        >
          {filtered.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
      {filtered.length === 0 && (
        <p className="rounded-2xl border border-border bg-surface p-8 text-center text-foreground-secondary">
          No projects match those filters.
        </p>
      )}
    </section>
  );
}
