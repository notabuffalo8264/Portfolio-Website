"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";
import { MODEL_CONFIG } from "./model-config";
import type { ScrollProgressRef } from "./scroll-progress";

export function ProceduralMechanismFallback({
  scrollProgress,
  reducedMotion = false,
  mobile = false,
}: {
  scrollProgress: ScrollProgressRef;
  reducedMotion?: boolean;
  mobile?: boolean;
}) {
  const group = useRef<Group>(null);
  const wheel = useRef<Group>(null);
  const smoothedProgress = useRef(0);

  useFrame((_, delta) => {
    if (reducedMotion) return;
    smoothedProgress.current = MathUtils.damp(
      smoothedProgress.current,
      scrollProgress.current,
      mobile ? MODEL_CONFIG.scroll.mobileDamping : MODEL_CONFIG.scroll.desktopDamping,
      delta,
    );
    const progress = smoothedProgress.current;
    const motionProgress = MathUtils.smoothstep(
      progress,
      MODEL_CONFIG.scroll.motionStart,
      MODEL_CONFIG.scroll.motionEnd,
    );
    const cycles = mobile ? MODEL_CONFIG.scroll.mobileCycles : MODEL_CONFIG.scroll.desktopCycles;
    const phase = motionProgress * Math.PI * 2 * cycles;
    if (group.current) {
      group.current.rotation.y = MathUtils.lerp(mobile ? -0.28 : -0.45, mobile ? 0.18 : 0.3, progress);
      group.current.rotation.x = MathUtils.lerp(0.18, mobile ? 0.08 : 0.02, progress);
      group.current.position.y = MathUtils.lerp(0, 0.04, progress);
    }
    if (wheel.current) wheel.current.rotation.z = phase;
  });

  return (
    <group ref={group} rotation={[0.18, -0.45, 0]}>
      <mesh position={[0, -1.1, 0]}>
        <boxGeometry args={[4.4, 0.32, 1.5]} />
        <meshStandardMaterial color="#111722" metalness={0.75} roughness={0.35} />
      </mesh>
      <group ref={wheel} position={[-0.7, 0.25, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[1.25, 0.22, 20, 64]} />
          <meshStandardMaterial color="#273347" metalness={0.9} roughness={0.22} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.65, 32]} />
          <meshStandardMaterial color="#4c7dff" metalness={0.65} roughness={0.25} />
        </mesh>
      </group>
      <mesh position={[1.25, 0.1, 0]} rotation={[0, 0, -0.18]}>
        <boxGeometry args={[2.6, 0.22, 0.38]} />
        <meshStandardMaterial color="#717c8b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[2.35, -0.3, 0]}>
        <boxGeometry args={[0.75, 0.85, 0.85]} />
        <meshStandardMaterial color="#151d2a" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
}
