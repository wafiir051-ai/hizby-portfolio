import LogoLoop from "@/components/LogoLoop";
import MagicBento from "@/components/MagicBento";
import { SERVICES, TECH } from "@/content";

export default function Services() {
  return (
    <section id="layanan" className="block" data-section data-shape="1" data-x="3.4" data-dim="0.16" aria-label="Layanan">
      <div className="bhead rv">
        <span className="num">04</span>
        <h2>Layanan</h2>
      </div>
      <div className="svc">
        <MagicBento
          items={SERVICES.map((s, i) => ({ id: i, label: "Layanan", title: s.title, description: s.desc }))}
          columns={2}
          rowHeight={190}
          gap={12}
          radius={0}
          theme="dark"
          glowColor="255, 77, 28"
          enableStars
          particleCount={10}
          enableTilt
          enableMagnetism
          intro={false}
        />
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
