import type { Metadata } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
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
  const bio = await getBioContent();

  return (
    <main className="container-page space-y-8">
      <header className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">About</h1>
        <p className="max-w-3xl text-foreground/80">
          I&apos;m a Mechanical Engineering major with a minor in Materials Science, focused on building practical systems across research, design, and software.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="relative h-56 overflow-hidden rounded-2xl border border-border">
          <Image src="/images/profile/profile.png" alt="Profile photo" fill className="object-cover" />
        </div>
        <article className="card p-5">
          <h2 className="text-lg font-semibold">Roles I&apos;m Seeking</h2>
          <p className="mt-3 text-foreground/85">
            Mechanical Engineering and R&D roles involving experimental design, materials design, and prototype development.
          </p>
        </article>
      </section>

      <section>
        <article className="card p-6">
          <h2 className="text-xl font-semibold">Bio</h2>
          <article className="mdx-content mt-3 text-foreground/85">{bio.content}</article>
        </article>
      </section>
    </main>
  );
}
