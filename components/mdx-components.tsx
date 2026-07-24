import Image from "next/image";
import { ImageCarousel } from "@/components/image-carousel";
import { ImageSlideshow } from "@/components/image-slideshow";

type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="mt-8 rounded-2xl border border-accent/25 bg-accent-soft p-5 md:p-6">
      <h4 className="font-mono text-xs uppercase tracking-[0.12em] text-accent-bright">{title}</h4>
      <div className="mt-3 text-sm leading-7 text-foreground-secondary">{children}</div>
    </aside>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground-muted">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

type ImageGalleryProps = {
  images?: { src: string; alt: string }[];
};

export function ImageGallery({ images }: ImageGalleryProps) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:-mx-24">
      {images.map((image) => (
        <figure key={image.src} className="relative h-64 overflow-hidden rounded-2xl border border-border bg-surface">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </figure>
      ))}
    </div>
  );
}

type TechTagListProps = {
  items?: string[];
};

export function TechTagList({ items }: TechTagListProps) {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <span key={item} className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
          {item}
        </span>
      ))}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  ImageCarousel,
  MetricCard,
  ImageGallery,
  ImageSlideshow,
  TechTagList,
};
