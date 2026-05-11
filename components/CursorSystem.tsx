"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorSystem() {
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);
  const coreX = useSpring(x, { stiffness: 520, damping: 32, mass: 0.2 });
  const coreY = useSpring(y, { stiffness: 520, damping: 32, mass: 0.2 });
  const glowX = useSpring(x, { stiffness: 90, damping: 24, mass: 0.6 });
  const glowY = useSpring(y, { stiffness: 90, damping: 24, mass: 0.6 });

  useEffect(() => {
    const canUseCursor =
      window.innerWidth >= 768 &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(canUseCursor);

    if (!canUseCursor) return;

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    const enterInteractive = () => setActive(true);
    const leaveInteractive = () => setActive(false);

    window.addEventListener("pointermove", move);
    const interactive = document.querySelectorAll("a, button, input, textarea");
    interactive.forEach((element) => {
      element.addEventListener("pointerenter", enterInteractive);
      element.addEventListener("pointerleave", leaveInteractive);
    });

    return () => {
      window.removeEventListener("pointermove", move);
      interactive.forEach((element) => {
        element.removeEventListener("pointerenter", enterInteractive);
        element.removeEventListener("pointerleave", leaveInteractive);
      });
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="cursor-orb"
        style={{ x: glowX, y: glowY, scale: active ? 1.18 : 1 }}
      />
      <motion.div
        aria-hidden="true"
        className="cursor-core"
        style={{ x: coreX, y: coreY, scale: active ? 1.7 : 1 }}
      />
    </>
  );
}
