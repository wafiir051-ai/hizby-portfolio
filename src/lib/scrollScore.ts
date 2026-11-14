import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/**
 * Skor scroll (scroll-craft): satu perangkat berbeda per bagian, tidak ada yang sama dua kali berurutan.
 *  Intro    pin + teks kinetik (kalimat berganti)
 *  Tentang  teks menyala kata per kata mengikuti bacaan
 *  Skill    pin, scroll memainkan keyboard (signature move, lewat event "skill-progress")
 *  Proyek   pan: scroll vertikal jadi geser horizontal (PUNCAK, rentang terpanjang)
 *  Layanan  reveal: kartu tersingkap dari tepi (clip-path)
 *  Kontak   kinetic: judul dan form menyusun diri
 * Dipanggil sekali, di dalam gsap.context, dalam urutan dokumen supaya jarak pin benar.
 */
export function initScrollScore() {
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const vh = () => window.innerHeight;
  const q = <T extends Element>(sel: string) => document.querySelector<T>(sel);
  const all = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);

  /* ---------- 1. INTRO: pin + kinetic ---------- */
  const intro = q<HTMLElement>("#intro");
  const cues = all<HTMLElement>("#intro [data-cue]");
  if (intro && cues.length > 1) {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: intro, start: "top top", end: () => `+=${vh() * 2.4}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
    });
    const step = 1 / cues.length;
    cues.forEach((cue, i) => {
      const p = cue.querySelector<HTMLElement>("p");
      if (i > 0 && p) {
        const sp = SplitText.create(p, { type: "lines,words", mask: "lines" });
        gsap.set(cue, { autoAlpha: 1 });
        tl.fromTo(sp.words, { yPercent: 115 }, { yPercent: 0, stagger: 0.02, duration: step * 0.28 }, i * step - step * 0.02);
      }
      if (i < cues.length - 1) tl.to(cue, { autoAlpha: 0, y: -36, duration: step * 0.22 }, (i + 1) * step - step * 0.26);
    });
  }

  /* ---------- 2. TENTANG: teks menyala kata per kata ---------- */
  const heading = q<HTMLElement>(".prose h3");
  if (heading) {
    const sp = SplitText.create(heading, { type: "lines", mask: "lines" });
    gsap.fromTo(sp.lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.12, ease: "none", scrollTrigger: { trigger: heading, start: "top 88%", end: "top 55%", scrub: true } });
  }
  all<HTMLElement>(".prose p").forEach((p) => {
    const sp = SplitText.create(p, { type: "words" });
    gsap.fromTo(sp.words, { opacity: 0.16 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 52%", scrub: true } });
  });
  const facts = q(".facts");
  if (facts) {
    gsap.from(".facts > div", { x: -28, opacity: 0, stagger: 0.14, ease: "none", scrollTrigger: { trigger: facts, start: "top 88%", end: "top 55%", scrub: true } });
  }

  /* ---------- 3. SKILL: pin, scroll memainkan keyboard ---------- */
  const skill = q<HTMLElement>("#skill");
  if (skill) {
    ScrollTrigger.create({
      trigger: skill,
      start: "top top",
      end: () => `+=${vh() * 2.8}`,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (s) => window.dispatchEvent(new CustomEvent("skill-progress", { detail: s.progress })),
    });
  }

  /* ---------- 4. PROYEK: pan horizontal (PUNCAK) ---------- */
  const stage = q<HTMLElement>(".pan__stage");
  const rail = q<HTMLElement>(".pan__rail");
  if (stage && rail) {
    const dist = () => Math.max(0, rail.scrollWidth - stage.clientWidth);
    const items = all<HTMLElement>(".pan__item");
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: stage, start: "top top", end: () => `+=${dist() * 1.9}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
    });
    tl.to(rail, { x: () => -dist(), duration: 1 }, 0);
    // item tiba berurutan seperti laci ditarik (item pertama sudah hadir)
    items.forEach((it, i) => {
      if (i === 0) return;
      tl.fromTo(it, { opacity: 0.45 }, { opacity: 1, duration: 0.14 }, Math.max(0, (i / items.length) * 0.85 - 0.12));
    });
  }

  /* ---------- 5. LAYANAN: reveal clip-path dari tepi ---------- */
  const svc = q<HTMLElement>("#layanan .svc");
  if (svc) {
    gsap.fromTo(svc, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: svc, start: "top 92%", end: "top 45%", scrub: true } });
  }

  /* ---------- 6. KONTAK: kinetic ---------- */
  const h2 = q<HTMLElement>(".contact-grid h2");
  if (h2) {
    const sp = SplitText.create(h2, { type: "lines,words", mask: "lines" });
    gsap.fromTo(sp.words, { yPercent: 115 }, { yPercent: 0, stagger: 0.07, ease: "none", scrollTrigger: { trigger: "#kontak", start: "top 70%", end: "top 25%", scrub: true } });
  }
  gsap.from(".contact-grid > div > p, .contact-grid .links a, .contact-grid .form > *", {
    y: 28,
    opacity: 0,
    stagger: 0.07,
    ease: "none",
    scrollTrigger: { trigger: ".contact-grid", start: "top 75%", end: "center 55%", scrub: true },
  });

  /* ---------- reveal umum (judul bagian dll) ---------- */
  all<HTMLElement>(".rv").forEach((el) => {
    gsap.from(el, { y: 34, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
  });
}
