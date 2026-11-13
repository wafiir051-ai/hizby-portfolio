import { SERVICES } from "@/content";

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
    </section>
  );
}
