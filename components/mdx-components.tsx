import Image from "next/image";

type CalloutProps = {
  title: string;
  children: React.ReactNode;
};

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-4">
      <h4 className="text-sm font-semibold text-accent">{title}</h4>
      <div className="mt-2 text-sm text-foreground/90">{children}</div>
    </aside>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

export function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-foreground/60">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
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
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {images.map((image) => (
        <div key={image.src} className="relative h-56 overflow-hidden rounded-xl border border-border">
          <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
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
        <span key={item} className="rounded-full border border-border bg-surface-muted px-3 py-1 text-xs">
          {item}
        </span>
      ))}
    </div>
  );
}

export const mdxComponents = {
  Callout,
  MetricCard,
  ImageGallery,
  TechTagList,
};
