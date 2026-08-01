"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Project } from "@/lib/types";

export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const reducedMotion = useReducedMotion();
  const reverse = index % 2 === 1;
  const imageFit = project.cardImageFit === "contain" ? "object-contain p-4" : "object-cover";

  return (
    <motion.article
      initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reducedMotion ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group border-t border-border py-8 first:border-t-0 md:py-14"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="focus-ring grid items-center gap-7 rounded-[24px] md:grid-cols-12 md:gap-10"
      >
        <div
          className={`relative min-h-[280px] overflow-hidden rounded-[24px] border border-border bg-surface md:min-h-[430px] ${
            index === 0 ? "md:col-span-8" : reverse ? "md:col-span-7 md:col-start-6" : "md:col-span-7"
          } ${reverse && index !== 0 ? "md:order-2" : ""}`}
          style={project.heroAspect ? { aspectRatio: project.heroAspect } : undefined}
        >
          <Image
            src={project.heroImage}
            alt=""
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className={`${imageFit} transition duration-500 group-hover:scale-[1.025]`}
            style={{ objectPosition: project.cardImagePosition ?? "center" }}
          />
        </div>
        <div className={`${index === 0 ? "md:col-span-4" : "md:col-span-5"} ${reverse && index !== 0 ? "md:order-1" : ""}`}>
          <p className="technical-label text-accent-bright">
            0{index + 1} / {project.category} · {formatDate(project.date)}
          </p>
          <h3 className="mt-4 text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.03] tracking-[-0.045em]">
            {project.title}
          </h3>
          <p className="mt-5 line-clamp-3 leading-7 text-foreground-secondary">{project.summary}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition group-hover:text-accent-bright">
            View project <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
