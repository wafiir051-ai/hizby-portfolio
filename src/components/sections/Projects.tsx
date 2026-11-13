import Mockup, { PhonesMock } from "@/components/Mockup";
import { PROJECTS } from "@/content";

export default function Projects({ goTo }: { goTo: (id: string) => void }) {
  return (
    <section id="proyek" className="block pan" data-section data-shape="4" data-x="3.4" data-dim="0.16" aria-label="Proyek">
      <div className="pan__stage">
        <div className="pan__rail">
          <div className="pan__item pan__head">
            <div className="bhead">
              <span className="num">03</span>
              <h2>Proyek</h2>
            </div>
            <p className="lead">Beberapa karya yang paling mewakili cara kerja saya.</p>
          </div>

          {PROJECTS.map((p, i) => {
            const text = (
              <>
                <span className="pan__i">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  {p.award && <p className="pan__award">{p.award}</p>}
                  {p.team && <p className="pan__team">Tim: {p.team.join(", ")}</p>}
                </div>
                <div className="pan__meta">
                  <span className="pc">
                    <b>{p.kind}</b>
                    <em>{p.tags.join(" · ")}</em>
                  </span>
                  <span className="ps">{p.href ? (p.linkLabel ?? "Lihat live") : "Segera hadir"}</span>
                </div>
              </>
            );
            const hasMock = !!(p.image || p.phones);
            const inner = hasMock ? (
              <>
                <div className="pan__col">{text}</div>
                {p.phones ? <PhonesMock phones={p.phones} title={p.title} /> : <Mockup desktop={p.image!} mobile={p.mobileImage} domain={p.href ? p.href.replace(/^https?:\/\//, "") : ""} title={p.title} ratio={p.mockRatio} position={p.mockPosition} />}
              </>
            ) : (
              text
            );
            const cls = `pan__item pan__proj${hasMock ? " pan__proj--mock" : ""}`;
            return p.href ? (
              <a key={p.title} className={cls} href={p.href} target="_blank" rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <article key={p.title} className={cls}>
                {inner}
              </article>
            );
          })}

          <div className="pan__item pan__end">
            <p>Ada ide lain yang ingin diwujudkan?</p>
            <a href="#kontak" className="btn ghost" onClick={(e) => (e.preventDefault(), goTo("kontak"))}>
              Hubungi saya
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
