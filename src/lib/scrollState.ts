/** State bersama (di luar React) antara scroll, kamera, dan partikel. */
export const world = {
  p: 0, // progres scroll dokumen 0..1
  shape: 0, // wujud partikel target: 0 nama, 1 bola, 2 simpul, 3 heliks, 4 cincin
  offsetX: 0, // geser horizontal wujud (satuan dunia)
  dim: 1, // kecerahan partikel 0..1
  pointer: { x: 0, y: 0, active: false }, // -1..1
  burstAt: -10, // detik, waktu klik terakhir
  reduced: false,
  ready: false, // partikel sudah dibangun
};

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
