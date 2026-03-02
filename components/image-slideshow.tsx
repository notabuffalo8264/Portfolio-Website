import Image from "next/image";

type Slide = {
  src: string;
  alt: string;
};

type ImageSlideshowProps = {
  images?: Slide[];
};

export function ImageSlideshow({ images }: ImageSlideshowProps) {
  if (!Array.isArray(images) || images.length === 0) {
    return null;
  }

  const slides = images;

  return (
    <div className="mt-6 space-y-3">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto rounded-xl border border-border p-2">
        {slides.map((image) => (
          <div key={image.src} className="relative h-72 min-w-full snap-start overflow-hidden rounded-lg sm:h-96">
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
      <p className="text-xs text-foreground/70">Scroll horizontally to view all images.</p>
    </div>
  );
}
