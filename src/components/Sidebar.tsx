"use client";

import { useEffect, useState } from "react";
import { PROFILE, SECTIONS } from "@/content";

export default function Sidebar({ active, goTo }: { active: string; goTo: (id: string) => void }) {
  const roles = PROFILE.roles;
  const [role, setRole] = useState(roles[0]);

  // efek ketik-hapus kalau peran lebih dari satu
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || roles.length < 2) return;
    let ri = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      setRole(word.slice(0, ci));
      let delay = deleting ? 35 : 65;
      if (!deleting && ci === word.length) {
        delay = 1500;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        delay = 300;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [roles]);

  return (
    <aside className="side">
      <div className="side-body">
        <figure className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PROFILE.photo} alt={`Foto ${PROFILE.name}`} width={900} height={1200} />
        </figure>
        <h1 className="name">{PROFILE.name}</h1>
        <p className="role">
          <span>{role}</span>
          <i className="caret" aria-hidden />
        </p>
        <nav className="menu" aria-label="Navigasi utama">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? "is-active" : undefined}
              onClick={(e) => {
                e.preventDefault();
                goTo(s.id);
              }}
            >
              <span>{String(i).padStart(2, "0")}</span>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="side-foot">
          <span>© {PROFILE.year}</span>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}
