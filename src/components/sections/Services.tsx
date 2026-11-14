import LogoLoop from "@/components/LogoLoop";
import { SERVICES, TECH } from "@/content";

export default function Services() {
  return (
    <section id="layanan" className="block" data-section data-shape="1" data-x="3.4" data-dim="0.16" aria-label="Layanan">
      <div className="bhead rv">
        <span className="num">04</span>
        <h2>Layanan</h2>
      </div>
      <div className="svc">
        {SERVICES.map((s, i) => (
          <article key={s.title}>
            <span className="n">/{String(i + 1).padStart(2, "0")}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
      <div className="techstrip rv">
        <p className="label">Tech stack dari karya-karya saya</p>
        <LogoLoop
          logos={TECH.map((t) => ({ node: <span className="tech">{t}</span>, title: t, ariaLabel: t }))}
          speed={55}
          gap={48}
          logoHeight={34}
          width="100%"
          fadeOut
          fadeOutColor="#eeebe3"
          pauseOnHover
        />
      </div>
    </section>
  );
}
