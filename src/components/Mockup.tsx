/** Mockup: jendela browser + ponsel berisi screenshot situs asli. */
export default function Mockup({ desktop, mobile, domain, title, ratio, position }: { desktop: string; mobile?: string; domain: string; title: string; ratio?: string; position?: string }) {
  return (
    <div className="mock">
      <div className="mock__win">
        <div className="mock__bar" aria-hidden>
          <i />
          <i />
          <i />
          <span>{domain}</span>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={desktop} alt={`Tampilan desktop ${title}`} width={1440} height={760} loading="lazy" style={{ aspectRatio: ratio, objectPosition: position }} />
      </div>
      {mobile && (
        <div className="mock__phone">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mobile} alt={`Tampilan ponsel ${title}`} width={390} height={844} loading="lazy" />
        </div>
      )}
    </div>
  );
}

/** Mockup beberapa layar ponsel (untuk desain aplikasi). */
export function PhonesMock({ phones, title }: { phones: string[]; title: string }) {
  return (
    <div className="phones">
      {phones.map((src, i) => (
        <div key={src} className="phone" data-i={i}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={`Layar ${i + 1} desain ${title}`} width={183} height={399} loading="lazy" />
        </div>
      ))}
    </div>
  );
}
