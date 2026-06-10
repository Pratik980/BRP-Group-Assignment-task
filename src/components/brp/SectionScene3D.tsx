import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

const BRAND = {
  navy: "#2A4580",
  indigo: "#4C5297",
  soft: "#6B72B8",
  mist: "#A8B0E0",
  teal: "#0d9488",
};

export type SectionSceneVariant = "community" | "career";

type NavigatorPerformanceHints = Navigator & {
  connection?: { saveData?: boolean };
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
      rootMargin: "120px 0px",
      threshold: 0.01,
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef]);

  return isVisible && hasFocus;
}

function SlowWavePlane({
  active,
  reduced,
  color,
}: {
  active: boolean;
  reduced: boolean;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const lastUpdate = useRef(0);
  const geo = useMemo(
    () => new THREE.PlaneGeometry(26, 16, reduced ? 20 : 28, reduced ? 14 : 18),
    [reduced],
  );
  const original = useMemo(() => {
    const pos = geo.attributes.position.array as Float32Array;
    return new Float32Array(pos);
  }, [geo]);

  useFrame((state) => {
    if (!active || !ref.current) return;
    const now = state.clock.elapsedTime;
    const frameInterval = reduced ? 1 / 12 : 1 / 18;
    if (now - lastUpdate.current < frameInterval) return;
    lastUpdate.current = now;
    const t = now * 0.28;

    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i += 3) {
      const x = original[i];
      const y = original[i + 1];
      pos[i + 2] =
        Math.sin(x * 0.35 + t * 0.5) * 0.22 +
        Math.cos(y * 0.4 + t * 0.38) * 0.18;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={ref} geometry={geo} rotation={[-Math.PI / 2.35, 0, 0]} position={[0, -2.8, -2]}>
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.32}
        emissive={color}
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

function SlowGlobe({ active, reduced, accent }: { active: boolean; reduced: boolean; accent: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = state.clock.elapsedTime * 0.22;
    ref.current.rotation.y = t;
    ref.current.rotation.x = Math.sin(t * 0.35) * 0.08;
    ref.current.position.y = 0.8 + Math.sin(t * 0.5) * 0.12;
  });

  return (
    <group ref={ref} position={[0, 0.8, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.35, reduced ? 1 : 2]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.32, reduced ? 16 : 24, reduced ? 16 : 24]} />
        <meshStandardMaterial
          color={BRAND.navy}
          transparent
          opacity={0.08}
          roughness={0.5}
          metalness={0.7}
          emissive={BRAND.indigo}
          emissiveIntensity={0.1}
        />
      </mesh>
    </group>
  );
}

function CommunityNetwork({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const nodeCount = reduced ? 6 : 10;
  const radius = 2.4;

  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.35, 0);
    });
  }, [nodeCount]);

  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = state.clock.elapsedTime * 0.18;
    ref.current.rotation.z = t * 0.15;
    ref.current.position.y = 1.6 + Math.sin(t * 0.4) * 0.08;
  });

  return (
    <group ref={ref} position={[0, 1.6, -1.5]}>
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? BRAND.teal : BRAND.soft}
            emissive={BRAND.teal}
            emissiveIntensity={0.35}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
      {nodes.map((a, i) => {
        const b = nodes[(i + 1) % nodes.length];
        const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
        const len = a.distanceTo(b);
        const angle = Math.atan2(b.y - a.y, b.x - a.x);
        return (
          <mesh key={`line-${i}`} position={[mid.x, mid.y, mid.z]} rotation={[0, 0, angle]}>
            <boxGeometry args={[len, 0.012, 0.012]} />
            <meshBasicMaterial color={BRAND.mist} transparent opacity={0.28} />
          </mesh>
        );
      })}
    </group>
  );
}

function CareerSteps({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const steps = reduced ? 3 : 5;

  useFrame((state) => {
    if (!active || !ref.current) return;
    const t = state.clock.elapsedTime * 0.2;
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.12;
    ref.current.position.y = Math.sin(t * 0.45) * 0.1;
  });

  return (
    <group ref={ref} position={[0.5, -0.2, -1]}>
      {Array.from({ length: steps }, (_, i) => (
        <mesh key={i} position={[-0.8 + i * 0.75, -0.6 + i * 0.55, -i * 0.2]}>
          <boxGeometry args={[1.1, 0.08, 0.55]} />
          <meshStandardMaterial
            color={BRAND.indigo}
            transparent
            opacity={0.35 + i * 0.08}
            metalness={0.75}
            roughness={0.25}
            emissive={BRAND.navy}
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

function SoftOrb({
  position,
  color,
  seed,
  reduced,
}: {
  position: [number, number, number];
  color: string;
  seed: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const base = position[1];

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.25 + seed;
    ref.current.position.y = base + Math.sin(t) * (reduced ? 0.1 : 0.18);
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <mesh ref={ref} position={position}>
      <octahedronGeometry args={[0.28, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.45}
        metalness={0.8}
        roughness={0.2}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

function AmbientSparkles({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={BRAND.mist}
        size={reduced ? 0.7 : 0.85}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function CommunityScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 5, 4]} intensity={0.85} />
      <pointLight position={[-4, 2, 2]} intensity={0.7} color={BRAND.teal} />
      <pointLight position={[4, -1, 1]} intensity={0.5} color={BRAND.soft} />
      <SlowWavePlane active={active} reduced={reduced} color={BRAND.indigo} />
      <SlowGlobe active={active} reduced={reduced} accent={BRAND.teal} />
      <CommunityNetwork active={active} reduced={reduced} />
      <SoftOrb position={[-3, 1.2, -0.5]} color={BRAND.teal} seed={0.5} reduced={reduced} />
      {!reduced && (
        <SoftOrb position={[3.2, 2, -1.2]} color={BRAND.soft} seed={2.1} reduced={reduced} />
      )}
      <AmbientSparkles count={reduced ? 12 : 24} reduced={reduced} />
      <fog attach="fog" args={["#f4f5fb", 9, 20]} />
    </>
  );
}

function CareerScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} />
      <pointLight position={[-3, 3, 1]} intensity={0.65} color={BRAND.soft} />
      <pointLight position={[3, 0, 2]} intensity={0.55} color={BRAND.indigo} />
      <SlowWavePlane active={active} reduced={reduced} color={BRAND.navy} />
      <SlowGlobe active={active} reduced={reduced} accent={BRAND.soft} />
      <CareerSteps active={active} reduced={reduced} />
      <SoftOrb position={[-2.8, 1.8, -0.8]} color={BRAND.navy} seed={1.2} reduced={reduced} />
      {!reduced && (
        <SoftOrb position={[2.6, 0.6, -0.4]} color={BRAND.indigo} seed={3.4} reduced={reduced} />
      )}
      <AmbientSparkles count={reduced ? 12 : 24} reduced={reduced} />
      <fog attach="fog" args={["#f4f5fb", 9, 20]} />
    </>
  );
}

const FALLBACK_CLASS = "bg-gradient-to-br from-primary/6 via-transparent to-accent/5";

export function SectionScene3D({
  variant = "community",
  className,
}: {
  variant?: SectionSceneVariant;
  className?: string;
}) {
  const [ready, setReady] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedSceneQuality();
  const active = useSceneActivity(containerRef);

  const onCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    requestAnimationFrame(() => setReady(true));
    gl.domElement.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      setUseFallback(true);
    });
  }, []);

  if (useFallback) {
    return <div ref={containerRef} className={cn(className, FALLBACK_CLASS)} aria-hidden />;
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        "transition-opacity duration-700 ease-out",
        "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]",
        ready ? "opacity-100" : "opacity-0",
      )}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.2, 7.5], fov: 50 }}
        dpr={reduced ? [0.65, 0.9] : [0.85, 1.05]}
        frameloop={active ? "always" : "demand"}
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        performance={{ min: 0.55 }}
        onCreated={onCreated}
      >
        {variant === "career" ? (
          <CareerScene active={active} reduced={reduced} />
        ) : (
          <CommunityScene active={active} reduced={reduced} />
        )}
      </Canvas>
    </div>
  );
}

export function SectionScene3DFallback({ className }: { className?: string }) {
  return <div className={cn(className, FALLBACK_CLASS)} aria-hidden />;
}
