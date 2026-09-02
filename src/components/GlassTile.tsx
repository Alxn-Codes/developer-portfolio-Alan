import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";

/**
 * A pointer-reactive glass tablet: tilts in 3D, bends its inner layers at
 * different depths and moves a specular sheen with the cursor.
 */
export function GlassTile({
  children,
  className = "",
  variants,
}: {
  children: ReactNode;
  className?: string;
  variants?: Record<string, unknown>;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 });
  const lift = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const sheenX = useSpring(px, { stiffness: 140, damping: 20 });
  const sheenY = useSpring(py, { stiffness: 140, damping: 20 });

  const sheen = useMotionTemplate`radial-gradient(220px circle at calc(${sheenX} * 100%) calc(${sheenY} * 100%), color-mix(in oklab, var(--primary) 26%, transparent), transparent 65%)`;
  const edge = useMotionTemplate`radial-gradient(320px circle at calc(${sheenX} * 100%) calc(${sheenY} * 100%), color-mix(in oklab, var(--primary) 55%, transparent), transparent 70%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    px.set(x);
    py.set(y);
    rotateY.set((x - 0.5) * 18);
    rotateX.set((0.5 - y) * 16);
    lift.set(-8);
  }

  function onLeave() {
    px.set(0.5);
    py.set(0.5);
    rotateX.set(0);
    rotateY.set(0);
    lift.set(0);
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ perspective: 900 }}
      className={className}
    >
      <motion.div
        style={{ rotateX, rotateY, y: lift, transformStyle: "preserve-3d" }}
        className="glass-tile relative h-full rounded-2xl p-5"
      >
        {/* refracted edge light */}
        <motion.div
          aria-hidden
          style={{ background: edge }}
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-40 mix-blend-screen"
        />
        {/* specular sheen */}
        <motion.div
          aria-hidden
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen"
        />
        <div style={{ transform: "translateZ(38px)" }} className="relative">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
