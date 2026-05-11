"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const particles = Array.from({ length: 42 }, (_, index) => ({
  id: index,
  left: `${(index * 19 + 11) % 100}%`,
  top: `${(index * 29 + 7) % 100}%`,
  delay: (index % 9) * 0.34,
  duration: 7 + (index % 6),
  size: 1 + (index % 4),
}));

export function BackgroundSystem() {
  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 22, mass: 0.25 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 22, mass: 0.25 });

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointerX.set(event.clientX - 160);
      pointerY.set(event.clientY - 160);
    };

    window.addEventListener("pointermove", updatePointer);
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [pointerX, pointerY]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 background-grid animate-grid-flow opacity-65" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(0,231,255,0.08)_28%,transparent_46%,rgba(138,92,255,0.08)_68%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
      <motion.div
        className="absolute h-80 w-80 rounded-full bg-cyan-300/14 blur-3xl"
        style={{ x: springX, y: springY }}
      />
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute rounded-full bg-cyan-100 shadow-neon"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
            animate={{ y: [-10, -42, -10], opacity: [0.12, 0.8, 0.12] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(3,5,8,0.16)_55%,rgba(3,5,8,0.9)_100%)]" />
    </div>
  );
}
