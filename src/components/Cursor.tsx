"use client";

import { useEffect, useRef } from "react";

/** Cincin kursor yang mengikuti mouse (hanya perangkat dengan mouse). */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !fine || reduce) return;
    let cx = 0, cy = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.classList.add("on");
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    const leave = () => el.classList.remove("on");
    const over = (e: MouseEvent) => el.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button,input,textarea"));
    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseover", over);
    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px,${cy}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseover", over);
    };
  }, []);
  return <div className="cursor" ref={ref} aria-hidden />;
}
