import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { mdxComponents } from "@/components/mdx-components";

export const metadata: Metadata = {
  title: "About",
  description: "About Christopher Kopiwoda.",
};

async function getBioContent() {
  const bioPath = path.join(process.cwd(), "content", "about", "bio.mdx");
  const source = await fs.readFile(bioPath, "utf-8");

  return compileMDX({
    source,
    options: { parseFrontmatter: false },
    components: mdxComponents,
  });
}

export default async function AboutPage() {
  notFound();

  const bio = await getBioContent();

  return (
    <main className="container-page space-y-16 pt-32">
      <header className="content-width border-b border-border pb-14">
        <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.06em]">About</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-foreground-secondary">
          I&apos;m a Mechanical Engineering major with a minor in Materials Science, focused on building practical systems across research, design, and software.
        </p>
      </header>

      <section className="content-width grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-end">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-border bg-surface">
          <Image src="/images/profile/profile.png" alt="Christopher Kopiwoda" fill className="object-cover" sizes="(min-width: 768px) 42vw, 100vw" priority />
        </div>
        <article className="border-t border-border py-7">
          <p className="technical-label">Current direction</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">Roles I&apos;m seeking</h2>
          <p className="mt-4 max-w-xl text-lg leading-8 text-foreground-secondary">
            Mechanical Engineering and R&D roles involving experimental design, materials design, and prototype development.
          </p>
        </article>
      </section>

      <section className="reading-width border-t border-border pt-10">
        <p className="technical-label text-accent-bright">Biography</p>
        <article className="mdx-content mt-6">{bio.content}</article>
      </section>
    </main>
  );
}
