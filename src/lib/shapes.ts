/** Generator titik untuk 5 wujud awan partikel. Semua array = Float32Array(n*3). */

const rnd = Math.random;

export function textShape(n: number, text: string, fontFamily: string, width: number) {
  const cw = 1600;
  const ch = 420;
  const c = document.createElement("canvas");
  c.width = cw;
  c.height = ch;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `400 340px ${fontFamily}, Georgia, serif`;
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 16;
  ctx.lineJoin = "round";
  ctx.strokeText(text, cw / 2, ch / 2 + 10);
  ctx.fillText(text, cw / 2, ch / 2 + 10);
  const data = ctx.getImageData(0, 0, cw, ch).data;
  const px: number[] = [];
  let minX = cw,
    maxX = 0;
  for (let y = 0; y < ch; y += 2) {
    for (let x = 0; x < cw; x += 2) {
      if (data[(y * cw + x) * 4 + 3] > 128) {
        px.push(x, y);
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
      }
    }
  }
  const out = new Float32Array(n * 3);
  const count = px.length / 2;
  const scale = width / Math.max(1, maxX - minX);
  const cx = (minX + maxX) / 2;
  for (let i = 0; i < n; i++) {
    const k = (rnd() * count) | 0;
    out[i * 3] = (px[k * 2] + rnd() * 2 - cx) * scale;
    out[i * 3 + 1] = -(px[k * 2 + 1] + rnd() * 2 - ch / 2) * scale;
    out[i * 3 + 2] = (rnd() - 0.5) * 0.7;
  }
  return out;
}

export function sphereShape(n: number, r = 2.6) {
  const out = new Float32Array(n * 3);
  const ga = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = ga * i;
    const rr = r * (1 + (rnd() - 0.5) * 0.04);
    out[i * 3] = Math.cos(th) * rad * rr;
    out[i * 3 + 1] = y * rr;
    out[i * 3 + 2] = Math.sin(th) * rad * rr;
  }
  return out;
}

export function knotShape(n: number, scale = 1.05) {
  const out = new Float32Array(n * 3);
  const p = 2;
  const q = 3;
  for (let i = 0; i < n; i++) {
    const t = rnd() * Math.PI * 2;
    const r = 2 + Math.cos(q * t);
    let x = r * Math.cos(p * t);
    let y = r * Math.sin(p * t);
    let z = -Math.sin(q * t);
    const a = rnd() * Math.PI * 2;
    const tube = 0.32 * Math.sqrt(rnd());
    x += Math.cos(a) * tube;
    y += Math.sin(a) * tube;
    z += (rnd() - 0.5) * tube * 2;
    out[i * 3] = x * scale;
    out[i * 3 + 1] = y * scale;
    out[i * 3 + 2] = z * scale;
  }
  return out;
}

/** Heliks ganda mengelilingi sumbu Y (kamera berada di dalamnya). */
export function helixShape(n: number, radius = 3, height = 7) {
  const out = new Float32Array(n * 3);
  const turns = 3.2;
  for (let i = 0; i < n; i++) {
    const strand = i % 3; // tiga untai
    const t = rnd();
    const ang = t * turns * Math.PI * 2 + (strand * Math.PI * 2) / 3;
    const jitter = (rnd() - 0.5) * 0.35;
    const rr = radius + jitter + Math.sin(t * 22 + strand) * 0.15;
    out[i * 3] = Math.cos(ang) * rr;
    out[i * 3 + 1] = (t - 0.5) * height;
    out[i * 3 + 2] = Math.sin(ang) * rr;
  }
  return out;
}

/** Cincin portal menghadap +Z, dengan debu halus di tengah. */
export function ringShape(n: number, r = 2.9) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    if (rnd() < 0.86) {
      const a = rnd() * Math.PI * 2;
      const tube = 0.38 * Math.sqrt(rnd());
      const b = rnd() * Math.PI * 2;
      const rr = r + Math.cos(b) * tube;
      out[i * 3] = Math.cos(a) * rr;
      out[i * 3 + 1] = Math.sin(a) * rr;
      out[i * 3 + 2] = Math.sin(b) * tube;
    } else {
      const a = rnd() * Math.PI * 2;
      const rr = r * 0.92 * Math.sqrt(rnd());
      out[i * 3] = Math.cos(a) * rr;
      out[i * 3 + 1] = Math.sin(a) * rr;
      out[i * 3 + 2] = (rnd() - 0.5) * 0.3;
    }
  }
  return out;
}
