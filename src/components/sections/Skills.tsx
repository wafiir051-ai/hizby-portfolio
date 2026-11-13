"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import { SKILLS } from "@/content";

// Tombol keyboard untuk tiap skill (maksimal 12 skill, urutan sama dengan SKILLS).
const KEYS = ["q", "w", "e", "r", "a", "s", "d", "f", "z", "x", "c", "v"];
const TONES = ["l", "m", "d"];

export default function Skills() {
  const items = SKILLS.slice(0, KEYS.length);
  const [active, setActive] = useState<number | null>(null);
  const [down, setDown] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const press = useCallback((i: number) => {
    setActive(i);
    setDown(i);
    setTick((t) => t + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setDown(null), 160);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      const i = KEYS.indexOf(e.key.toLowerCase());
      if (i !== -1 && i < items.length) press(i);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [press, items.length]);

  // Signature move: gulir memainkan keyboard (progres pin dikirim dari scrollScore)
  useEffect(() => {
    let last = -1;
    const on = (e: Event) => {
      const p = (e as CustomEvent<number>).detail;
      const i = Math.min(items.length - 1, Math.floor(p * items.length * 0.999));
      if (i !== last) {
        last = i;
        press(i);
      }
    };
    window.addEventListener("skill-progress", on);
    return () => window.removeEventListener("skill-progress", on);
  }, [press, items.length]);

  const cur = active === null ? null : items[active];

  return (
    <section id="skill" className="block" data-section data-shape="3" data-x="0" data-dim="0.1" aria-label="Skill">
      <div className="bhead rv">
        <span className="num">02</span>
        <h2>Skill</h2>
      </div>
      <div className="skills rv">
        <div className="quip pop" aria-live="polite" key={tick}>
          <small>(keyboard ini main sendiri saat kamu menggulir. Tekan Q W E R / A S D F / Z X C V untuk mengambil alih)</small>
          <b>{cur ? <DecryptedText text={cur.name} animateOn="view" speed={40} sequential revealDirection="start" /> : "Skill"}</b>
          <p>{cur ? cur.note : "Gulir pelan, atau tekan tombol di keyboard kamu, atau klik salah satu keycap."}</p>
        </div>
        <div className="kb-wrap">
          <div className="kb" role="group" aria-label="Keyboard skill">
            {items.map((s, i) => (
              <button
                key={s.name}
                type="button"
                className={`key ${TONES[i % 3]}${active === i ? " sel" : ""}${down === i ? " dn" : ""}`}
                aria-label={s.name}
                onClick={() => press(i)}
              >
                <span className="cap">
                  <i>{KEYS[i]}</i>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
