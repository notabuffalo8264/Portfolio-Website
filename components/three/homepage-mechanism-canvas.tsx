"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { ModelErrorBoundary } from "./model-error-boundary";
import { HomepageMechanismModel } from "./homepage-mechanism-model";
import { ProceduralMechanismFallback } from "./procedural-mechanism-fallback";
import type { ScrollProgressRef } from "./scroll-progress";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(window.WebGL2RenderingContext && canvas.getContext("webgl2")) ||
      Boolean(window.WebGLRenderingContext && canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function HomepageMechanismCanvas({
  scrollProgress,
}: {
  scrollProgress: ScrollProgressRef;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [webGL] = useState(() => supportsWebGL());
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMobile(mobileQuery.matches);
      setReducedMotion(motionQuery.matches);
    };
    mobileQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      mobileQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting && document.visibilityState === "visible");
    }, { rootMargin: "120px" });
    const onVisibility = () => setActive(!document.hidden && node.getBoundingClientRect().bottom > -120);
    observer.observe(node);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (!webGL) {
    return (
      <div className="grid h-full place-items-center" aria-hidden="true">
        <div className="relative h-48 w-64 rounded-full border border-accent/20 bg-accent/10 blur-[1px]">
          <span className="absolute inset-x-8 top-1/2 h-px bg-accent/60" />
          <span className="absolute inset-y-8 left-1/2 w-px bg-accent/40" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative h-full w-full" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={mobile ? [1, 1.25] : [1, 1.5]}
        camera={{ position: [0, 0.65, 8], fov: 34, near: 0.1, far: 100 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.85} />
        <hemisphereLight args={["#dce7ff", "#07090d", 1.5]} />
        <directionalLight position={[4, 5, 6]} color="#d9e5ff" intensity={3.1} />
        <pointLight position={[-4, 2, -3]} color="#4c7dff" intensity={mobile ? 18 : 28} distance={12} />
        <pointLight position={[3, -2, 4]} color="#7189b8" intensity={8} distance={10} />
        <Suspense fallback={
          <ProceduralMechanismFallback scrollProgress={scrollProgress} reducedMotion={reducedMotion} mobile={mobile} />
        }>
          <ModelErrorBoundary fallback={
            <ProceduralMechanismFallback scrollProgress={scrollProgress} reducedMotion={reducedMotion} mobile={mobile} />
          }>
            <HomepageMechanismModel
              scrollProgress={scrollProgress}
              reducedMotion={reducedMotion}
              mobile={mobile}
            />
          </ModelErrorBoundary>
        </Suspense>
      </Canvas>
    </div>
  );
}
