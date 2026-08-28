"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(false);

  function previous() {
    setIndex((value) => (value === 0 ? slides.length - 1 : value - 1));
  }

  function next() {
    setIndex((value) => (value === slides.length - 1 ? 0 : value + 1));
  }

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      } else if (event.key === "ArrowLeft") {
        setIndex((value) => (value === 0 ? slides.length - 1 : value - 1));
      } else if (event.key === "ArrowRight") {
        setIndex((value) => (value === slides.length - 1 ? 0 : value + 1));
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, slides.length]);

  if (slides.length === 0) {
    return null;
  }

  const current = slides[index];

  return (
    <div className="mt-6 space-y-3">
      <div className="relative h-72 overflow-hidden rounded-xl border border-border bg-black/5 sm:h-96">
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          aria-label={`Enlarge image: ${current.alt}`}
          className="absolute inset-0 z-0 cursor-zoom-in"
        >
          <Image src={current.src} alt={current.alt} fill className="object-contain p-2" />
        </button>

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

      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded project gallery"
          className="fixed inset-0 z-50 flex min-h-screen flex-col bg-black/95 p-4 sm:p-8"
        >
          <div className="flex items-center justify-between text-white">
            <p className="text-sm text-white/70">
              {index + 1} / {slides.length}
            </p>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Close expanded gallery"
              className="rounded-full border border-white/20 bg-white/10 p-2 transition hover:bg-white/20"
            >
              <X size={20} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-4 sm:py-8">
            <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="100vw" />

            <button
              type="button"
              onClick={previous}
              aria-label="Previous image"
              className="absolute left-0 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-4"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-0 rounded-full border border-white/20 bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-4"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <p className="truncate text-center text-sm text-white/70">{current.alt}</p>
        </div>
      )}

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
