"use client";

import { CONTACT, PROFILE } from "@/content";

export default function Contact({ goTo }: { goTo: (id: string) => void }) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const nama = String(f.get("nama") ?? "");
    const email = String(f.get("email") ?? "");
    const pesan = String(f.get("pesan") ?? "");
    const isi = pesan + "\n\n" + nama + " (" + email + ")";
    window.location.href = CONTACT.email
      ? `mailto:${CONTACT.email}?subject=${encodeURIComponent("Pesan dari " + nama)}&body=${encodeURIComponent(isi)}`
      : `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo Hizby, saya " + nama + ".\n\n" + pesan + "\n\nEmail saya: " + email)}`;
  };
  const rows: { label: string; href: string; ext: boolean; note?: string }[] = [
    ...(CONTACT.whatsapp ? [{ label: "WhatsApp", href: `https://wa.me/${CONTACT.whatsapp}`, ext: true, note: CONTACT.phone }] : []),
    ...(CONTACT.email ? [{ label: "Email", href: `mailto:${CONTACT.email}`, ext: false, note: CONTACT.email }] : []),
    ...CONTACT.links.map((l) => ({ label: l.label, href: l.href, ext: true })),
  ];

  return (
    <>
      <section id="kontak" className="block contact" data-section data-shape="4" data-x="3.2" data-dim="0.5" aria-label="Kontak">
        <div className="bhead rv">
          <span className="num">05</span>
          <h2>Kontak</h2>
        </div>
        <div className="contact-grid">
          <div>
            <h2>{CONTACT.line}</h2>
            <p>{CONTACT.sub}</p>
            <div className="links">
              {rows.map((r) => (
                <a key={r.label} href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {r.label}
                  {r.note && <small>{r.note}</small>}
                  <span>→</span>
                </a>
              ))}
            </div>
          </div>
          <form className="form" onSubmit={submit}>
            <div className="f2">
              <label>
                Nama
                <input name="nama" required placeholder="Nama kamu" autoComplete="name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required placeholder="kamu@contoh.com" autoComplete="email" />
              </label>
            </div>
            <label>
              Pesan
              <textarea name="pesan" rows={5} required placeholder="Ceritakan tentang proyekmu..." />
            </label>
            <button className="btn" type="submit">
              Kirim pesan
            </button>
            <p className="note">{CONTACT.email ? "Pesan akan dibuka di aplikasi email kamu." : "Pesan akan dibuka di WhatsApp kamu."} Datamu tidak dikirim ke server mana pun.</p>
          </form>
        </div>
      </section>
      <footer className="foot">
        <span>
          {PROFILE.name} © {PROFILE.year}
        </span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            goTo("top");
          }}
        >
          Kembali ke atas ↑
        </a>
      </footer>
    </>
  );
}
