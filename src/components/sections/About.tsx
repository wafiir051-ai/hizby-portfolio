import { ABOUT } from "@/content";

export default function About() {
  return (
    <section id="tentang" className="block" data-section data-shape="2" data-x="3.2" data-dim="0.28" aria-label="Tentang">
      <div className="bhead rv">
        <span className="num">01</span>
        <h2>Tentang</h2>
      </div>
      <div className="about">
        <div className="prose">
          <h3>{ABOUT.heading}</h3>
          {ABOUT.body.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <dl className="facts">
          {ABOUT.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
