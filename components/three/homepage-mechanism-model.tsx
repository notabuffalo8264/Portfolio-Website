"use client";

/* eslint-disable react-hooks/immutability -- Three.js animation is intentionally imperative. */

import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Group,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PropertyBinding,
  SphereGeometry,
  Vector3,
} from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";
import {
  circleCircleIntersections,
  closestPoint,
  type IntersectionPair,
  type PlanePoint,
} from "./four-bar-geometry";
import { MODEL_CONFIG } from "./model-config";
import type { ScrollProgressRef } from "./scroll-progress";

type InitialTransform = {
  node: Object3D;
  position: Vector3;
  rotation: [number, number, number];
};

const INCHES_TO_METERS = 0.0254;
const DEBUG_LINKAGE = false;

function rangeProgress(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0;
  return MathUtils.clamp((progress - start) / (end - start), 0, 1);
}

function smoothRange(progress: number, start: number, end: number): number {
  const value = rangeProgress(progress, start, end);
  return value * value * (3 - 2 * value);
}

// Verified against public/models/monkey.glb. Coordinates are in the model's
// local YZ motion plane; rotations therefore occur around local X.
const FOUR_BAR_CONFIG = {
  plane: "YZ" as const,
  groundLength: 7 * INCHES_TO_METERS,
  crankLength: 1.25 * INCHES_TO_METERS,
  couplerLength: 5.5 * INCHES_TO_METERS,
  rockerLength: 5.5 * INCHES_TO_METERS,
  angularSpeed: (Math.PI * 2) / 4,
  orientationOffsets: {
    crank: 0,
    coupler: 0,
    rocker: 0,
  },
  mechanisms: [
    {
      id: "left",
      phaseOffset: 0,
      nodes: {
        crank: "Link2-1",
        coupler: "Link3-1",
        rocker: "Link4-1",
        hands: ["Left Hand2.0-1"],
      },
      pivots: {
        o2: new Vector3(-0.022098, 0.03302, -0.009525),
        o4: new Vector3(-0.025273, 0.03302, -0.187325),
        initialA: new Vector3(-0.022098, 0.00238, -0.017847),
        initialB: new Vector3(-0.025273, 0.125948, -0.083016),
      },
    },
    {
      id: "right",
      phaseOffset: Math.PI,
      nodes: {
        crank: "Link2-2",
        coupler: "Link3-3",
        rocker: "Link4-3",
        hands: ["Right Hand2.0-1"],
      },
      pivots: {
        o2: new Vector3(0.079502, 0.03302, -0.009525),
        o4: new Vector3(0.082677, 0.03302, -0.187325),
        initialA: new Vector3(0.079502, 0.06366, -0.001203),
        initialB: new Vector3(0.082677, 0.15003, -0.111005),
      },
    },
  ],
};

const GEAR_CONFIG = [
  { name: "Gear-1", axis: "x", direction: 1 },
  { name: "Pinion-1", axis: "z", direction: 1 },
] as const;

type MechanismConfig = (typeof FOUR_BAR_CONFIG.mechanisms)[number];

type DebugVisuals = {
  pointA: Mesh;
  pointB: Mesh;
  linePositions: Float32Array;
  lineAttribute: BufferAttribute;
};

type FourBarRuntime = {
  config: MechanismConfig;
  crankGroup: Group;
  couplerGroup: Group;
  rockerGroup: Group;
  initialCrankAngle: number;
  initialCouplerAngle: number;
  initialRockerAngle: number;
  previousB: PlanePoint;
  pointA: PlanePoint;
  candidates: IntersectionPair;
  warnedInvalid: boolean;
  debug?: DebugVisuals;
};

type GearRuntime = {
  config: (typeof GEAR_CONFIG)[number];
  pivotGroup: Group;
};

function angleInYZ(from: Vector3 | PlanePoint, to: Vector3 | PlanePoint) {
  return Math.atan2(to.z - from.z, to.y - from.y);
}

function distanceInYZ(from: Vector3, to: Vector3) {
  return Math.hypot(to.y - from.y, to.z - from.z);
}

function getGltfNode(scene: Object3D, exportedName: string) {
  return scene.getObjectByName(exportedName)
    ?? scene.getObjectByName(PropertyBinding.sanitizeNodeName(exportedName));
}

function createPivotGroup(parent: Object3D, node: Object3D, pivot: Vector3, name: string) {
  const group = new Group();
  group.name = name;
  group.position.copy(pivot);
  parent.add(group);
  parent.updateMatrixWorld(true);
  group.attach(node);
  return group;
}

function createDebugVisuals(parent: Object3D, config: MechanismConfig): DebugVisuals {
  const debugGroup = new Group();
  debugGroup.name = `FourBarDebug_${config.id}`;
  parent.add(debugGroup);

  const sphereGeometry = new SphereGeometry(0.004, 12, 8);
  const createPoint = (color: number, position: Vector3) => {
    const point = new Mesh(sphereGeometry, new MeshBasicMaterial({ color, depthTest: false }));
    point.position.copy(position);
    point.renderOrder = 10;
    debugGroup.add(point);
    return point;
  };

  createPoint(0x4c7dff, config.pivots.o2);
  const pointA = createPoint(0xffcc55, config.pivots.initialA);
  const pointB = createPoint(0x65e6a7, config.pivots.initialB);
  createPoint(0xff6b6b, config.pivots.o4);

  const linePositions = new Float32Array(12);
  const lineAttribute = new BufferAttribute(linePositions, 3);
  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", lineAttribute);
  const line = new Line(lineGeometry, new LineBasicMaterial({ color: 0xffffff, depthTest: false }));
  line.renderOrder = 9;
  debugGroup.add(line);

  return { pointA, pointB, linePositions, lineAttribute };
}

function updateDebugVisuals(runtime: FourBarRuntime, pointB: PlanePoint) {
  if (!runtime.debug) return;
  const { o2, o4 } = runtime.config.pivots;
  const { pointA, debug, config } = runtime;
  debug.pointA.position.set(config.pivots.initialA.x, pointA.y, pointA.z);
  debug.pointB.position.set(config.pivots.initialB.x, pointB.y, pointB.z);

  debug.linePositions.set([
    o2.x, o2.y, o2.z,
    config.pivots.initialA.x, pointA.y, pointA.z,
    config.pivots.initialB.x, pointB.y, pointB.z,
    o4.x, o4.y, o4.z,
  ]);
  debug.lineAttribute.needsUpdate = true;
}

function setupFourBarLinkages(scene: Object3D): FourBarRuntime[] {
  const cacheKey = "__fourBarRuntimes";
  const cached = scene.userData[cacheKey] as FourBarRuntime[] | undefined;
  if (cached) return cached;

  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed("Verified monkey.glb scene hierarchy");
    scene.traverse((object) => console.log(object.name, object.type, object.position.toArray()));
    console.groupEnd();
  }

  const dimensions = [
    FOUR_BAR_CONFIG.groundLength,
    FOUR_BAR_CONFIG.crankLength,
    FOUR_BAR_CONFIG.couplerLength,
    FOUR_BAR_CONFIG.rockerLength,
  ];
  if (dimensions.some((dimension) => !Number.isFinite(dimension) || dimension <= 0)) {
    console.error("Four-bar linkage dimensions must all be positive finite values.");
    scene.userData[cacheKey] = [];
    return [];
  }

  const runtimes: FourBarRuntime[] = [];
  for (const config of FOUR_BAR_CONFIG.mechanisms) {
    const crank = getGltfNode(scene, config.nodes.crank);
    const coupler = getGltfNode(scene, config.nodes.coupler);
    const rocker = getGltfNode(scene, config.nodes.rocker);
    const hands = config.nodes.hands.map((name) => getGltfNode(scene, name));
    const missing = [
      !crank && config.nodes.crank,
      !coupler && config.nodes.coupler,
      !rocker && config.nodes.rocker,
      ...hands.map((hand, index) => !hand && config.nodes.hands[index]),
    ].filter(Boolean);

    if (!crank || !coupler || !rocker || hands.some((hand) => !hand)) {
      console.error(`Four-bar ${config.id} is missing GLB nodes: ${missing.join(", ")}`);
      continue;
    }

    const groundLength = distanceInYZ(config.pivots.o2, config.pivots.o4);
    if (Math.abs(groundLength - FOUR_BAR_CONFIG.groundLength) > 0.001) {
      console.warn(`Four-bar ${config.id} ground pivots do not match the configured ground length.`);
    }

    const parent = crank.parent;
    if (!parent) {
      console.error(`Four-bar ${config.id} crank has no parent node.`);
      continue;
    }

    scene.updateMatrixWorld(true);
    const crankGroup = createPivotGroup(parent, crank, config.pivots.o2, `CrankPivot_${config.id}`);
    const couplerGroup = createPivotGroup(parent, coupler, config.pivots.initialA, `CouplerPivot_${config.id}`);
    for (const hand of hands) couplerGroup.attach(hand!);
    const rockerGroup = createPivotGroup(parent, rocker, config.pivots.o4, `RockerPivot_${config.id}`);

    const runtime: FourBarRuntime = {
      config,
      crankGroup,
      couplerGroup,
      rockerGroup,
      initialCrankAngle: angleInYZ(config.pivots.o2, config.pivots.initialA),
      initialCouplerAngle: angleInYZ(config.pivots.initialA, config.pivots.initialB),
      initialRockerAngle: angleInYZ(config.pivots.o4, config.pivots.initialB),
      previousB: { y: config.pivots.initialB.y, z: config.pivots.initialB.z },
      pointA: { y: config.pivots.initialA.y, z: config.pivots.initialA.z },
      candidates: [{ y: 0, z: 0 }, { y: 0, z: 0 }],
      warnedInvalid: false,
    };
    if (DEBUG_LINKAGE) runtime.debug = createDebugVisuals(parent, config);
    runtimes.push(runtime);
  }

  scene.userData[cacheKey] = runtimes;
  return runtimes;
}

function setupGearRotations(scene: Object3D): GearRuntime[] {
  const cacheKey = "__gearRuntimes";
  const cached = scene.userData[cacheKey] as GearRuntime[] | undefined;
  if (cached) return cached;

  scene.updateMatrixWorld(true);
  const runtimes: GearRuntime[] = [];

  for (const config of GEAR_CONFIG) {
    const gear = getGltfNode(scene, config.name);
    const parent = gear?.parent;
    if (!gear || !parent) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`Gear animation is missing GLB node: ${config.name}`);
      }
      continue;
    }

    // SolidWorks exports do not guarantee that a mesh origin is at the gear
    // center. Build a pivot at its visual center, in the common YZ motion plane.
    const worldCenter = new Box3().setFromObject(gear).getCenter(new Vector3());
    const localCenter = parent.worldToLocal(worldCenter);
    const pivotGroup = createPivotGroup(
      parent,
      gear,
      localCenter,
      `GearPivot_${config.name}`,
    );
    runtimes.push({ config, pivotGroup });
  }

  scene.userData[cacheKey] = runtimes;
  return runtimes;
}

export function HomepageMechanismModel({
  scrollProgress,
  reducedMotion,
  mobile,
}: {
  scrollProgress: ScrollProgressRef;
  reducedMotion: boolean;
  mobile: boolean;
}) {
  const presentation = useRef<Group>(null);
  const sceneRoot = useRef<Group>(null);
  const gltf = useGLTF(MODEL_CONFIG.url);
  const scene = useMemo(() => clone(gltf.scene), [gltf.scene]);
  const { actions } = useAnimations(gltf.animations, sceneRoot);
  const linkageRuntimes = useMemo(() => setupFourBarLinkages(scene), [scene]);
  const gearRuntimes = useMemo(() => setupGearRotations(scene), [scene]);
  const smoothedProgress = useRef(0);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const { viewport, camera } = useThree();

  const modelBounds = useMemo(() => {
    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());
    return {
      center,
      maxDimension: Math.max(size.x, size.y, size.z) || 1,
      rotationEnvelopeWidth: Math.hypot(size.x, size.z) || 1,
      rotationEnvelopeHeight: size.y + size.z * 0.1 || 1,
    };
  }, [scene]);

  const framing = useMemo(() => {
    const targetSize = mobile ? MODEL_CONFIG.targetSizeMobile : MODEL_CONFIG.targetSizeDesktop;
    const targetScale = targetSize / modelBounds.maxDimension;
    const widthScale = (viewport.width * (mobile ? 0.94 : 0.96)) / modelBounds.rotationEnvelopeWidth;
    const heightScale = (viewport.height * (mobile ? 0.86 : 0.92)) / modelBounds.rotationEnvelopeHeight;
    const responsiveScale = Math.min(targetScale, widthScale, heightScale) * MODEL_CONFIG.scaleMultiplier;

    return {
      position: [
        -modelBounds.center.x + MODEL_CONFIG.positionOffset[0],
        -modelBounds.center.y + MODEL_CONFIG.positionOffset[1],
        -modelBounds.center.z + MODEL_CONFIG.positionOffset[2],
      ] as [number, number, number],
      displayPosition: [
        mobile ? 0 : viewport.width * 0.04,
        viewport.height * (mobile ? 0 : 0.015),
        0,
      ] as [number, number, number],
      scale: responsiveScale,
    };
  }, [mobile, modelBounds, viewport.height, viewport.width]);

  const initialTransforms = useMemo(() => {
    const names = ["Flywheel", "Crank", "Slider", "SliderInsert", "ConnectingRod", "CrankPin", "RodPinA"];
    return new Map(
      names.flatMap((name) => {
        const node = scene.getObjectByName(name);
        if (!node) return [];
        const value: InitialTransform = {
          node,
          position: node.position.clone(),
          rotation: [node.rotation.x, node.rotation.y, node.rotation.z],
        };
        return [[name, value] as const];
      }),
    );
  }, [scene]);

  const selectedClip = useMemo(
    () => gltf.animations.find((clip) => clip.name === "HomepageLoop") ?? gltf.animations[0],
    [gltf.animations],
  );

  useEffect(() => {
    if (!selectedClip) return;
    const action = actions[selectedClip.name];
    if (!action) return;
    // Preserve clip discovery for compatible exports, but do not let a baked
    // animation compete with the verified scroll-driven linkage solver.
    action.stop();
    action.enabled = false;
    return () => {
      action.stop();
      action.enabled = true;
    };
  }, [actions, selectedClip]);

  useFrame(({ pointer }, delta) => {
    const root = presentation.current;
    if (!root) return;

    const safeDelta = Math.min(Math.max(delta, 0), MODEL_CONFIG.scroll.maxFrameDelta);
    const targetProgress = reducedMotion
      ? 0
      : MathUtils.clamp(scrollProgress.current, 0, 1);

    if (reducedMotion) {
      smoothedProgress.current = 0;
    } else {
      const dampedProgress = MathUtils.damp(
          smoothedProgress.current,
          targetProgress,
          mobile ? MODEL_CONFIG.scroll.mobileDamping : MODEL_CONFIG.scroll.desktopDamping,
          safeDelta,
        );
      smoothedProgress.current = MathUtils.clamp(
        dampedProgress,
        Math.max(0, targetProgress - MODEL_CONFIG.scroll.maxProgressLag),
        Math.min(1, targetProgress + MODEL_CONFIG.scroll.maxProgressLag),
      );
    }

    const progress = smoothedProgress.current;
    const presentationProgress = smoothRange(
      progress,
      MODEL_CONFIG.scroll.presentationStart,
      MODEL_CONFIG.scroll.presentationEnd,
    );
    const cameraProgress = reducedMotion || mobile
      ? 0
      : smoothRange(progress, MODEL_CONFIG.scroll.cameraStart, MODEL_CONFIG.scroll.cameraEnd);

    if (reducedMotion) {
      root.rotation.set(0.18, -0.45, MODEL_CONFIG.rotationOffset[2]);
      root.position.set(...framing.displayPosition);
      pointerOffset.current.x = 0;
      pointerOffset.current.y = 0;
      camera.position.y = 0.65;
      camera.position.z = 8;
    } else {
      pointerOffset.current.x = MathUtils.damp(
        pointerOffset.current.x,
        mobile ? 0 : pointer.x * 0.05,
        8,
        safeDelta,
      );
      pointerOffset.current.y = MathUtils.damp(
        pointerOffset.current.y,
        mobile ? 0 : pointer.y * 0.03,
        8,
        safeDelta,
      );
      const startY = mobile ? -0.28 : -0.45;
      const endY = mobile ? 0.18 : 0.3;
      const startX = mobile ? 0.16 : 0.18;
      const endX = mobile ? 0.06 : -0.02;

      root.rotation.y =
        MathUtils.lerp(startY, endY, presentationProgress) + pointerOffset.current.x;
      root.rotation.x =
        MathUtils.lerp(startX, endX, presentationProgress) - pointerOffset.current.y;
      root.rotation.z = MODEL_CONFIG.rotationOffset[2];
      root.position.x = framing.displayPosition[0];
      root.position.y = framing.displayPosition[1] + presentationProgress * 0.04;
      root.position.z = framing.displayPosition[2];

      camera.position.y = 0.65 + cameraProgress * 0.08;
      camera.position.z = MathUtils.lerp(8, MODEL_CONFIG.scroll.cameraEndZ, cameraProgress);
    }

    const linkageProgress = reducedMotion
      ? 0
      : smoothRange(progress, MODEL_CONFIG.scroll.motionStart, MODEL_CONFIG.scroll.motionEnd);
    const cycleCount = mobile ? MODEL_CONFIG.scroll.mobileCycles : MODEL_CONFIG.scroll.desktopCycles;
    const linkagePhase = linkageProgress * Math.PI * 2 * cycleCount;

    for (const runtime of gearRuntimes) {
      runtime.pivotGroup.rotation[runtime.config.axis] =
        linkagePhase * runtime.config.direction;
    }

    if (linkageRuntimes.length > 0) {
      const baseCrankAngle = linkageRuntimes[0].initialCrankAngle;

      for (const runtime of linkageRuntimes) {
        const { config } = runtime;
        const inputAngle = baseCrankAngle + linkagePhase + config.phaseOffset;
        runtime.pointA.y = config.pivots.o2.y + FOUR_BAR_CONFIG.crankLength * Math.cos(inputAngle);
        runtime.pointA.z = config.pivots.o2.z + FOUR_BAR_CONFIG.crankLength * Math.sin(inputAngle);

        const intersections = circleCircleIntersections(
          runtime.pointA,
          FOUR_BAR_CONFIG.couplerLength,
          config.pivots.o4,
          FOUR_BAR_CONFIG.rockerLength,
          runtime.candidates,
        );

        if (!intersections) {
          if (!runtime.warnedInvalid && process.env.NODE_ENV === "development") {
            console.warn(
              `Four-bar ${config.id} reached an invalid position; keeping its last valid pose.`,
            );
            runtime.warnedInvalid = true;
          }
          continue;
        }

        const pointB = closestPoint(intersections, runtime.previousB);
        const values = [runtime.pointA.y, runtime.pointA.z, pointB.y, pointB.z];
        if (!values.every(Number.isFinite)) {
          if (!runtime.warnedInvalid && process.env.NODE_ENV === "development") {
            console.warn(`Four-bar ${config.id} produced a non-finite solution.`);
            runtime.warnedInvalid = true;
          }
          continue;
        }

        runtime.previousB.y = pointB.y;
        runtime.previousB.z = pointB.z;
        runtime.crankGroup.rotation.x =
          inputAngle - runtime.initialCrankAngle + FOUR_BAR_CONFIG.orientationOffsets.crank;

        runtime.couplerGroup.position.set(
          config.pivots.initialA.x,
          runtime.pointA.y,
          runtime.pointA.z,
        );
        runtime.couplerGroup.rotation.x =
          Math.atan2(pointB.z - runtime.pointA.z, pointB.y - runtime.pointA.y) -
          runtime.initialCouplerAngle +
          FOUR_BAR_CONFIG.orientationOffsets.coupler;

        runtime.rockerGroup.rotation.x =
          Math.atan2(pointB.z - config.pivots.o4.z, pointB.y - config.pivots.o4.y) -
          runtime.initialRockerAngle +
          FOUR_BAR_CONFIG.orientationOffsets.rocker;

        updateDebugVisuals(runtime, pointB);
      }
      return;
    }

    const mechanicalPhase = linkagePhase;
    for (const [name, transform] of initialTransforms) {
      const { node, position, rotation } = transform;
      node.position.copy(position);
      node.rotation.set(...rotation);
      if (name === "Flywheel" || name === "Crank") node.rotation.z = rotation[2] + mechanicalPhase;
      if (name === "Slider" || name === "SliderInsert") node.position.x = position.x + Math.sin(mechanicalPhase) * 0.36;
      if (name === "ConnectingRod") {
        node.rotation.z = rotation[2] + Math.sin(mechanicalPhase) * 0.18;
        node.position.x = position.x + Math.sin(mechanicalPhase) * 0.08;
      }
      if (name === "CrankPin" || name === "RodPinA") node.rotation.z = rotation[2] + mechanicalPhase;
    }
  });

  return (
    <group ref={presentation}>
      <group
        ref={sceneRoot}
        scale={framing.scale}
      >
        <group position={framing.position}>
          <primitive object={scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_CONFIG.url);
