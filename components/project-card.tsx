"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { formatDate } from "@/lib/format";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card overflow-hidden"
    >
      <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        <div className="relative h-44 w-full">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" />
        </div>
        <div className="space-y-3 p-4">
          <div className="flex items-center justify-between text-xs text-foreground/70">
            <span>{project.category}</span>
            <span>{formatDate(project.date)}</span>
          </div>
          <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
          <p className="text-sm text-foreground/80">{project.impact}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full bg-surface-muted px-2.5 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
