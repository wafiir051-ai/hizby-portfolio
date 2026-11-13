import SplitText from "@/components/SplitText";
import Magnet from "@/components/Magnet";
import { INTRO, PROFILE } from "@/content";

export default function Intro({ ready, goTo }: { ready: boolean; goTo: (id: string) => void }) {
  return (
    <section id="intro" className="block intro" data-section data-shape="1" data-x="3.2" data-dim="0.55" aria-label="Intro">
      <p className="tag">Selamat datang di portofolio saya</p>
      <div className="intro__stage">
        <div data-cue>
          {ready ? (
            <SplitText text={PROFILE.intro} tag="p" splitType="words" trigger="load" textAlign="left" className="statement" />
          ) : (
            <p className="statement" style={{ opacity: 0 }}>
              {PROFILE.intro}
            </p>
          )}
        </div>
        {INTRO.cues.map((c) => (
          <div data-cue key={c}>
            <p className="statement">{c}</p>
          </div>
        ))}
      </div>
      <div className="cta">
        <Magnet magnetStrength={3} padding={50}>
          <a href="#proyek" className="btn" onClick={(e) => (e.preventDefault(), goTo("proyek"))}>
            Lihat proyek
          </a>
        </Magnet>
        <a href="#kontak" className="btn ghost" onClick={(e) => (e.preventDefault(), goTo("kontak"))}>
          Hubungi saya
        </a>
      </div>
    </section>
  );
}
