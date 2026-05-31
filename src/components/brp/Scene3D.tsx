import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents, Float, Sparkles } from "@react-three/drei";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const BRAND = {
  deep: "#242021",
  navy: "#2A4580",
  indigo: "#4C5297",
  soft: "#6B72B8",
  mist: "#A8B0E0",
};

type NavigatorPerformanceHints = Navigator & {
  connection?: {
    saveData?: boolean;
  };
  deviceMemory?: number;
};

function useReducedSceneQuality() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = window.navigator as NavigatorPerformanceHints;

    const update = () => {
      setReduced(
        motionQuery.matches ||
          Boolean(nav.connection?.saveData) ||
          (nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 4) ||
          (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
          window.innerWidth < 768,
      );
    };

    update();
    motionQuery.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      motionQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return reduced;
}

function useSceneActivity(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [isVisible, setIsVisible] = useState(true);
  const [hasFocus, setHasFocus] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateFocus = () => setHasFocus(document.visibilityState === "visible");
    updateFocus();
    document.addEventListener("visibilitychange", updateFocus);

    return () => document.removeEventListener("visibilitychange", updateFocus);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: "160px 0px",
      threshold: 0.01,
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  return isVisible && hasFocus;
}

function TopographyPlane({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const lastUpdate = useRef(0);
  const geo = useMemo(
    () => new THREE.PlaneGeometry(22, 14, reduced ? 24 : 32, reduced ? 16 : 22),
    [reduced],
  );
  const original = useMemo(() => {
    const pos = geo.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geo]);

  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = state.clock.elapsedTime;
    const frameInterval = reduced ? 1 / 14 : 1 / 24;
    if (t - lastUpdate.current < frameInterval) return;
    lastUpdate.current = t;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      const wave =
        Math.sin(x * 0.45 + t * 0.6) * 0.35 +
        Math.cos(y * 0.5 + t * 0.45) * 0.3 +
        Math.sin((x + y) * 0.25 + t * 0.3) * 0.25;
      pos[i + 2] = wave;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2.4, 0, 0]} position={[0, -2.2, -1]}>
      <meshStandardMaterial
        color={BRAND.indigo}
        wireframe
        transparent
        opacity={0.55}
        emissive={BRAND.navy}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function WireGlobe({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * (reduced ? 0.035 : 0.08);
    ref.current.rotation.x = Math.sin(t * 0.15) * (reduced ? 0.05 : 0.12);
    ref.current.position.x = state.pointer.x * (reduced ? 0.1 : 0.25);
    ref.current.position.y = 1.2 + state.pointer.y * (reduced ? 0.06 : 0.15);
  });
  return (
    <group ref={ref} position={[0, 1.2, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.6, reduced ? 2 : 3]} />
        <meshBasicMaterial color={BRAND.soft} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.58, reduced ? 24 : 32, reduced ? 24 : 32]} />
        <meshStandardMaterial
          color={BRAND.navy}
          transparent
          opacity={0.15}
          roughness={0.4}
          metalness={0.8}
          emissive={BRAND.indigo}
          emissiveIntensity={0.15}
        />
      </mesh>
    </group>
  );
}

function FloatingShard({
  position,
  scale,
  rotation,
  color,
  reduced,
}: {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  color: string;
  reduced: boolean;
}) {
  return (
    <Float
      speed={reduced ? 0.6 : 1.2}
      rotationIntensity={reduced ? 0.2 : 0.6}
      floatIntensity={reduced ? 0.35 : 1.1}
    >
      <mesh position={position} rotation={rotation} scale={scale}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.25}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Beam({ active, x, delay }: { active: boolean; x: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = (state.clock.elapsedTime + delay) % 6;
    ref.current.position.y = -3 + t * 1.2;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.sin((t / 6) * Math.PI) * 0.35;
  });
  return (
    <mesh ref={ref} position={[x, 0, -2]}>
      <planeGeometry args={[0.04, 4]} />
      <meshBasicMaterial color={BRAND.mist} transparent opacity={0} />
    </mesh>
  );
}

function WebGLContextGuard({ onContextLost }: { onContextLost: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (e: Event) => {
      e.preventDefault();
      onContextLost();
      try {
        gl.dispose();
      } catch {
        // ignore
      }
    };
    canvas.addEventListener("webglcontextlost", onLost, false);
    return () => canvas.removeEventListener("webglcontextlost", onLost);
  }, [gl, onContextLost]);

  return null;
}

function Scene({ active, reduced, onContextLost }: { active: boolean; reduced: boolean; onContextLost: () => void }) {
  return (
    <>
      <WebGLContextGuard onContextLost={onContextLost} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.0} color="#ffffff" />
      {!reduced && <pointLight position={[-5, 2, -2]} intensity={1.4} color={BRAND.soft} />}
      <pointLight position={[5, -1, 2]} intensity={reduced ? 0.55 : 1.0} color={BRAND.indigo} />

      <TopographyPlane active={active} reduced={reduced} />
      <WireGlobe active={active} reduced={reduced} />

      <FloatingShard
        position={[-3.2, 0.6, -0.5]}
        scale={0.7}
        rotation={[0.3, 0.4, 0.2]}
        color={BRAND.indigo}
        reduced={reduced}
      />
      <FloatingShard
        position={[3.4, 1.4, -1]}
        scale={0.55}
        rotation={[0.6, 0.2, 0.5]}
        color={BRAND.navy}
        reduced={reduced}
      />
      {!reduced && (
        <>
          <FloatingShard
            position={[-2.6, 2.4, -2]}
            scale={0.4}
            rotation={[0.2, 0.8, 0.1]}
            color={BRAND.soft}
            reduced={reduced}
          />
          <FloatingShard
            position={[2.8, -0.4, 0.5]}
            scale={0.5}
            rotation={[0.7, 0.5, 0.3]}
            color={BRAND.mist}
            reduced={reduced}
          />
        </>
      )}

      <Beam active={active} x={-4.5} delay={0} />
      {!reduced && <Beam active={active} x={-2.2} delay={2} />}
      <Beam active={active} x={1.8} delay={1} />
      {!reduced && <Beam active={active} x={4.2} delay={3.5} />}

      <Sparkles
        count={reduced ? 16 : 36}
        scale={[14, 8, 6]}
        size={reduced ? 0.9 : 1.05}
        speed={reduced ? 0.06 : 0.11}
        color={BRAND.mist}
        opacity={reduced ? 0.28 : 0.36}
      />

      <fog attach="fog" args={["#f4f5fb", 8, 18]} />
    </>
  );
}

const SCENE_FALLBACK_CLASS =
  "bg-gradient-to-b from-primary/8 to-transparent";

export function Scene3D({ className }: { className?: string }) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedSceneQuality();
  const active = useSceneActivity(containerRef);
  const [useFallback, setUseFallback] = useState(false);

  const onCreated = useCallback(() => {
    requestAnimationFrame(() => setReady(true));
  }, []);

  if (useFallback) {
    return (
      <div
        ref={containerRef}
        className={cn(className, SCENE_FALLBACK_CLASS)}
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        "transition-opacity duration-500 ease-out",
        ready ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, -0.35, 6.5], fov: 55 }}
        dpr={reduced ? [0.7, 0.95] : [0.9, 1.15]}
        frameloop={active ? "always" : "demand"}
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        performance={{ min: 0.6 }}
        onCreated={onCreated}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <Scene active={active} reduced={reduced} onContextLost={() => setUseFallback(true)} />
      </Canvas>
    </div>
  );
}
