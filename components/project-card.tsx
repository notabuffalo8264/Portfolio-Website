"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/lib/types";
import { parseProjectDate } from "@/lib/format";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const year = parseProjectDate(project.date).getFullYear();
  const category = project.category === "Mechanical Engineering" ? "Mechanical" : project.category;

  return (
    <motion.article
      variants={{
        hidden: {
          opacity: 0,
          y: reduceMotion ? 0 : 14,
          scale: reduceMotion ? 1 : 0.985,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: reduceMotion ? 0 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className="group relative isolate aspect-[5/4] overflow-hidden rounded-[18px] bg-surface"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="focus-ring absolute inset-0 block overflow-hidden rounded-[18px]"
        aria-label={`View ${project.title}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={project.heroImage}
            alt={`${project.title} project preview`}
            fill
            priority={index === 0}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover saturate-[0.86] contrast-[1.03] brightness-[0.84] transition duration-500 ease-out group-hover:scale-[1.025] group-hover:brightness-[0.91]"
            style={{ objectPosition: project.cardImagePosition ?? "center center" }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(4,6,9,0.94)_0%,rgba(4,6,9,0.42)_38%,rgba(4,6,9,0.04)_68%,transparent_82%)]" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-secondary">
            <span className="text-accent-bright">{category}</span>
            <span aria-hidden="true"> · </span>
            {Number.isNaN(year) ? project.date : year}
          </p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <h2 className="max-w-[85%] text-xl font-semibold leading-tight tracking-[-0.025em] text-foreground md:text-2xl">
              {project.title}
            </h2>
            <span className="flex shrink-0 translate-y-1 items-center text-foreground opacity-80 transition duration-300 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100">
              <ArrowUpRight size={18} className="transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
