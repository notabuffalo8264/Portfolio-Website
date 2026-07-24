"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type CSSProperties } from "react";
import { MODEL_CONFIG } from "@/components/three/model-config";

const HomepageMechanismCanvas = dynamic(
  () => import("@/components/three/homepage-mechanism-canvas"),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center" aria-hidden="true">
        <div className="h-44 w-72 rounded-full border border-accent/20 bg-accent/10 shadow-[0_0_80px_rgba(76,125,255,0.12)]" />
      </div>
    ),
  },
);

function rangeProgress(progress: number, start: number, end: number) {
  return Math.min(1, Math.max(0, (progress - start) / (end - start)));
}

function smoothRange(progress: number, start: number, end: number) {
  const value = rangeProgress(progress, start, end);
  return value * value * (3 - 2 * value);
}

export function HomeHero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);
  const heroCopyRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const reducedMotionRef = useRef(Boolean(reducedMotion));

  useEffect(() => {
    reducedMotionRef.current = Boolean(reducedMotion);
    if (reducedMotion) scrollProgress.current = 0;
  }, [reducedMotion]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const previousScrollRestoration = window.history.scrollRestoration;
    const hashTargetId = decodeURIComponent(window.location.hash.slice(1));
    const hasIntentionalHash = Boolean(
      hashTargetId && document.getElementById(hashTargetId),
    );
    let frame = 0;
    let settleFrame = 0;
    let trackingEnabled = hasIntentionalHash;

    window.history.scrollRestoration = "manual";
    scrollProgress.current = 0;

    const update = () => {
      frame = 0;
      if (!trackingEnabled) return;
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const progress = reducedMotionRef.current || scrollableDistance <= 0
        ? 0
        : Math.min(1, Math.max(0, -section.getBoundingClientRect().top / scrollableDistance));
      scrollProgress.current = progress;

      if (heroCopyRef.current) {
        const midSequenceFade = smoothRange(progress, 0.45, 0.75) * 0.22;
        const transitionFade = smoothRange(progress, 0.75, 1) * 0.36;
        const opacity = 1 - midSequenceFade - transitionFade;
        heroCopyRef.current.style.opacity = String(opacity);
      }

      if (continueRef.current) {
        const opacity = 1 - smoothRange(progress, 0.02, 0.15);
        continueRef.current.style.opacity = String(opacity);
        continueRef.current.style.pointerEvents = opacity < 0.05 ? "none" : "auto";
        continueRef.current.tabIndex = opacity < 0.05 ? -1 : 0;
      }

    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    if (hasIntentionalHash) {
      requestUpdate();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        scrollProgress.current = 0;
        settleFrame = window.requestAnimationFrame(() => {
          settleFrame = 0;
          trackingEnabled = true;
          update();
        });
      });
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      if (settleFrame) window.cancelAnimationFrame(settleFrame);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  const handleContinue = () => {
    document.getElementById("overview")?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const sectionStyle = {
    "--hero-mobile-height": `${MODEL_CONFIG.scroll.mobileSectionVh}svh`,
    "--hero-desktop-height": `${MODEL_CONFIG.scroll.desktopSectionVh}svh`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      style={sectionStyle}
      className="relative h-[var(--hero-mobile-height)] md:h-[var(--hero-desktop-height)] motion-reduce:h-[100svh]"
    >
      <div className="engineering-grid sticky top-0 h-screen overflow-hidden">
        <div className="mx-auto grid min-h-screen w-full max-w-[1600px] grid-rows-[auto_1fr] items-center gap-1 px-5 pb-4 pt-20 md:grid-cols-[minmax(360px,0.8fr)_minmax(0,1.2fr)] md:grid-rows-1 md:gap-8 md:px-8 md:py-16 lg:px-12 xl:grid-cols-[minmax(430px,0.8fr)_minmax(620px,1.2fr)]">
          <motion.div
            ref={heroCopyRef}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 max-w-xl will-change-transform"
          >
            <h1 className="text-[clamp(3.35rem,6.4vw,6.75rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              Christopher
              <br />
              Kopiwoda
            </h1>
            <div className="mt-7 flex items-center gap-6 md:mt-10 md:gap-7">
              <div className="relative h-32 w-28 shrink-0 overflow-hidden rounded-[14px] border border-border bg-surface md:h-40 md:w-32 md:rounded-2xl xl:h-48 xl:w-40">
                <Image
                  src="/images/profile/profile.png"
                  alt="Portrait of Christopher Kopiwoda"
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1280px) 160px, (min-width: 768px) 128px, 112px"
                  className="object-cover object-[52%_center]"
                />
              </div>
              <ul className="space-y-1.5 text-sm font-medium leading-snug text-foreground md:space-y-2 md:text-base">
                <li>Mechanical Engineering</li>
                <li>Programming</li>
                <li>Materials Research</li>
              </ul>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 md:mt-10">
              <Link href="/projects" className="button-primary">
                View projects <ArrowRight size={16} />
              </Link>
              <Link href="/resume" className="button-secondary">
                View resume
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : 0.15 }}
            className="relative h-[35svh] min-h-[230px] w-full md:h-[88svh] md:min-h-[620px]"
          >
            <HomepageMechanismCanvas scrollProgress={scrollProgress} />
          </motion.div>
        </div>
        <button
          ref={continueRef}
          type="button"
          onClick={handleContinue}
          className="focus-ring absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 cursor-pointer items-center gap-2 rounded-sm border-0 bg-transparent p-0 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-muted transition hover:text-foreground md:flex"
        >
          Continue <ArrowDownRight size={14} />
        </button>
      </div>
    </section>
  );
}
