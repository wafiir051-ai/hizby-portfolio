"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Cursor from "@/components/Cursor";
import Sidebar from "@/components/Sidebar";
import Intro from "@/components/sections/Intro";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { PROFILE } from "@/content";
import { world } from "@/lib/scrollState";
import { initScrollScore } from "@/lib/scrollScore";

const World = dynamic(() => import("./World"), { ssr: false });

export default function Site() {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState("intro");

  // layar loading: tunggu partikel selesai dibangun (minimal 700ms biar tidak berkedip)
  useEffect(() => {
    const t0 = performance.now();
    const done = () => setTimeout(() => setReady(true), Math.max(0, 700 - (performance.now() - t0)));
    if (world.ready) done();
    window.addEventListener("world-ready", done, { once: true });
    const fallback = setTimeout(() => setReady(true), 6000);
    return () => {
      window.removeEventListener("world-ready", done);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    world.reduced = reduced;

    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;
    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1 });
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    let cancelled = false;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (s) => {
          world.p = s.progress;
          document.documentElement.style.setProperty("--sp", s.progress.toFixed(4));
        },
      });
    });
    // efek scroll dibuat setelah font siap (pemecahan baris butuh ukuran teks final)
    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        if (!reduced) initScrollScore();
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });

    // bagian yang sedang dibaca menentukan wujud partikel dan menu aktif
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const sec = e.target as HTMLElement;
          const mobile = window.innerWidth < 760;
          const dim = Number(sec.dataset.dim ?? 1);
          world.shape = Number(sec.dataset.shape ?? 0);
          world.offsetX = mobile ? 0 : Number(sec.dataset.x ?? 0);
          world.dim = mobile ? Math.min(dim, 0.3) : dim;
          setActive(sec.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll<HTMLElement>("[data-section]").forEach((sec) => io.observe(sec));

    return () => {
      cancelled = true;
      io.disconnect();
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  const goTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(id === "top" ? 0 : el, { duration: 1.8 });
    else el.scrollIntoView();
  }, []);

  return (
    <>
      <div className="atmos" aria-hidden />
      <div className="bgglow" aria-hidden />
      <World />
      <div className="grain" aria-hidden />
      <Cursor />

      <div className="loader" data-hide={ready} aria-hidden={ready} role="status">
        <p className="loader__name">{PROFILE.short}</p>
        <span className="loader__bar" />
        <p className="loader__txt">Menyusun partikel</p>
      </div>

      <div className="shell" id="top">
        <Sidebar active={active} goTo={goTo} />
        <main className="main">
          <Intro ready={ready} goTo={goTo} />
          <About />
          <Skills />
          <Projects goTo={goTo} />
          <Services />
          <Contact goTo={goTo} />
        </main>
      </div>
    </>
  );
}
