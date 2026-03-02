"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

type Slide = {
  src: string;
  alt: string;
};

type ImageCarouselProps = {
  imagesJson?: string;
};

export function ImageCarousel({ imagesJson }: ImageCarouselProps) {
  const slides = useMemo<Slide[]>(() => {
    if (!imagesJson) {
      return [];
    }

    try {
      const parsed = JSON.parse(imagesJson) as Slide[];
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter((item) => typeof item?.src === "string" && typeof item?.alt === "string");
    } catch {
      return [];
    }
  }, [imagesJson]);

  const [index, setIndex] = useState(0);

  if (slides.length === 0) {
    return null;
  }

  const current = slides[index];

  function previous() {
    setIndex((value) => (value === 0 ? slides.length - 1 : value - 1));
  }

  function next() {
    setIndex((value) => (value === slides.length - 1 ? 0 : value + 1));
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-black/5 sm:h-96">
        <Image src={current.src} alt={current.alt} fill className="object-contain p-2" />

        <button
          type="button"
          onClick={previous}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/85 p-2 transition hover:bg-surface"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/85 p-2 transition hover:bg-surface"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-foreground/70">
          {index + 1} / {slides.length}
        </p>

        <div className="flex items-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to image ${dotIndex + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${dotIndex === index ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
