import { useEffect, useRef } from "react";

type Dot = { x: number; y: number };

/**
 * Canvas cursor trail: a chain of eased points drawn as a tapering,
 * glowing ribbon. Disabled for touch/coarse pointers and reduced motion.
 */
export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 22;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let active = false;
    const dots: Dot[] = Array.from({ length: COUNT }, () => ({ ...target }));

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      active = true;
    };
    const onLeave = () => {
      active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let raf = 0;
    let alpha = 0;

    const frame = () => {
      alpha += ((active ? 1 : 0) - alpha) * 0.06;

      let prev = target;
      for (const dot of dots) {
        dot.x += (prev.x - dot.x) * 0.34;
        dot.y += (prev.y - dot.y) * 0.34;
        prev = dot;
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (alpha > 0.01) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "rgba(11, 214, 168, 0.55)";
        ctx.shadowBlur = 14;
        for (let i = 1; i < dots.length; i++) {
          const t = 1 - i / dots.length;
          ctx.strokeStyle = `rgba(11, 214, 168, ${0.5 * t * alpha})`;
          ctx.lineWidth = 10 * t * t + 1;
          ctx.beginPath();
          ctx.moveTo(dots[i - 1]!.x, dots[i - 1]!.y);
          ctx.lineTo(dots[i]!.x, dots[i]!.y);
          ctx.stroke();
        }
        ctx.shadowBlur = 22;
        ctx.fillStyle = `rgba(231, 227, 218, ${0.85 * alpha})`;
        ctx.beginPath();
        ctx.arc(dots[0]!.x, dots[0]!.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 hidden md:block"
    />
  );
}
