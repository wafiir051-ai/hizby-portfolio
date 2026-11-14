# Portofolio Hizby Fauzan 'Aisyi Design Language

> Situs portofolio pribadi seorang murid RPL (Full Stack & Mobile Developer) untuk calon klien, juri lomba, dan perekrut, yang membaca di desktop maupun ponsel.

## 1. Visual Theme

**Theme statement:** Editorial, taktil, kinetik portfolio

**Character:** Terasa seperti halaman majalah cetak berwarna putih tulang yang ternyata hidup: judul serif besar, label mono kecil berhuruf kapital, garis tipis, sudut kotak. Gerak selalu melayani konten (scroll memainkan keyboard, proyek bergeser ke samping, partikel 3D berganti bentuk), tidak pernah dekoratif murni. Satu aksen oranye-merah dipakai hemat.

**References:** Portofolio referensi dari pengguna (sidebar profil + daftar bagian, hitam-putih, serif/mono); Instrument Serif editorial; label mono gaya Swiss; React Bits (komponen interaktif); seni partikel Three.js.

---

## 2. Color Palette

### Neutral (tema terang, satu-satunya tema)
| Token | Value | Usage |
|---|---|---|
| `--bg` | #EEEBE3 | Latar halaman (putih tulang hangat) |
| `--soft` | #E4E0D5 | Permukaan halus (input, placeholder foto) |
| `--line` | #CDC9BD | Garis tipis 1px pemisah bagian, kartu, menu |
| `--faint` | #6F6C64 | Label kecil, nomor bagian, teks sekunder mono |
| `--dim` | #4F4D47 | Teks isi |
| `--fg` | #111111 | Judul, tinta utama, tombol solid, fokus |
| `--hovdim` | #A8A59B | Teks sekunder saat baris dibalik jadi gelap |

### Accent (satu warna)
| Token | Value | Usage |
|---|---|---|
| `--accent` | #FF4D1C | Kursor ketik, penanda tag, nomor menu aktif, garis progres, seleksi teks, serpihan partikel, glow kartu |

### Permukaan gelap (hanya komponen React Bits)
Kartu Layanan (MagicBento, tema `dark`, glow `255, 77, 28`) dan kartu profil (ProfileCard, tema `dark`). Keycap keyboard punya tiga nada: terang `#FBFAF6` / bayangan `#B3AFA3`, sedang `#C9C5B9` / `#8A867B`, gelap `#2A2A2A` / `#111` berteks putih.

### Semantic
Tidak ada UI status (sukses/peringatan/galat) di situs ini. Titik hijau "aktif" pada kartu profil berasal dari pustaka. **Mode gelap: tidak didukung.**

---

## 3. Typography

**Font families:**
- Display / judul: Instrument Serif (400), Georgia, serif
- Isi: DM Sans, system-ui, sans-serif
- Mono (label, menu, tombol, nomor): DM Mono (400/500), ui-monospace, Menlo, monospace

**Type scale** (nilai yang benar-benar dipakai):
| Role | Size | Line height | Font |
|---|---|---|---|
| Loader / nama besar | clamp(3rem, 9vw, 5.5rem) | 1 | serif |
| Kontak judul | clamp(2.6rem, 6vw, 5.5rem) | 1 | serif |
| Statement Intro | clamp(2rem, 4.4vw, 4.2rem) | 1.08 | serif |
| Judul bagian (h2) | clamp(2.2rem, 4.2vw, 3.6rem) | 1 | serif |
| Quip skill | clamp(2.4rem, 5vw, 4.4rem) | 1 | serif |
| Subjudul (h3) | clamp(1.8rem, 3vw, 2.6rem) | 1.1 | serif |
| Judul kartu/baris | clamp(1.5rem, 2.4vw, 2.1rem) | 1.1 | serif |
| Isi | 1rem | 1.65 | sans |
| Label/menu/tombol | 0.7 sampai 0.8rem, uppercase, tracking 0.06 sampai 0.12em | normal | mono |

---

## 4. Components

| Component | Hierarchy | Purpose | Key variants |
|---|---|---|---|
| Sidebar | Template | Navigasi tetap kiri 380px, scroll-spy | Desktop (kartu profil), ponsel (header ringkas + menu bawah) |
| SideCard (ProfileCard) | Component | Kartu profil holografik di pojok kiri atas | Peran berganti (efek ketik) |
| Block + BHead | Component | Pembungkus bagian dengan nomor + judul | Bagian biasa, bagian dipin |
| Button | Primitive | Aksi utama | Solid, ghost, besar; sudut kotak |
| Tag | Primitive | Penanda teknologi | Garis tipis, mono uppercase |
| Keyboard 3D + Quip | Pattern | Memilih skill (klik, tombol 1-9, 0, -, =, atau scroll) | 3 nada keycap, pilih, ditekan |
| Pan rail + Project card | Pattern | Proyek bergeser horizontal saat scroll | Dengan mockup browser/ponsel, placeholder |
| Mockup | Component | Jendela browser + ponsel dari screenshot asli | Satu desktop + satu ponsel, tiga ponsel (Figma) |
| Service bento (MagicBento) | Pattern | Kartu layanan dengan glow dan miring 3D | 2 kolom, tema gelap |
| LogoLoop | Component | Deretan tech stack berjalan | Pause saat hover, tepi memudar |
| Form + Links | Pattern | Kontak: form ke WhatsApp/email, daftar tautan | Baris dibalik gelap saat hover |
| Loader, Cursor ring | Primitive | Layar muat; cincin kursor | Cursor hanya mouse |
| Atmos + Particle world | Template | Latar: grid, glow kursor, grain, partikel 3D 5 bentuk | Dimmer per bagian |

---

## 5. Layout

**Grid:** dua kolom: sidebar tetap `--side` 380px (290px di ≤1100px) + konten fluid. Konten memakai `--pad` clamp(1.5rem, 5vw, 4.5rem).

**Base unit:** rem; tidak ada skala spasi formal (nilai 0.45, 0.55, 0.9, 1.1, 1.4, 1.75, 2, 2.5rem tersebar). Padding vertikal bagian clamp(3.5rem, 8vw, 6.5rem).

**Breakpoints:** 1100px (sidebar menyempit), 900px (sidebar jadi header, menu ke bawah), 640px (rail proyek lebih sempit), 560px (form satu kolom).

**Density:** Comfortable.

---

## 6. Depth

Permukaan datar dengan garis tipis, bukan bayangan. Bayangan hanya untuk benda "fisik":

| Token | Value | Used for |
|---|---|---|
| mock window | 0 30px 60px -32px rgba(17,17,17,0.45) | Jendela browser mockup |
| mock phone | 0 24px 40px -18px rgba(17,17,17,0.5) | Ponsel mockup |
| keycap | 14 lapis offset -1px 1px sampai -14px 14px | Keyboard 3D |

**Z-index:** atmos/glow `-1` · shell 1 · sidebar 2 · konten pin 3 · grain 5 · menu bawah ponsel 50 · loader dan kursor 100.

---

## 7. Do's and Don'ts

### Do
- Pakai tepat satu aksen (`--accent`) dan hanya untuk penanda kecil.
- Judul selalu serif 400; label dan menu selalu mono uppercase.
- Sudut kotak (radius 0) di semua kontrol; radius hanya untuk ponsel mockup dan kartu pustaka.
- Hanya data asli: tidak ada angka karangan; isian yang belum diketahui jelas bertanda TODO di `content.ts`.
- Setiap bagian punya satu perangkat scroll berbeda dan tidak sama dua kali berurutan.

### Don't
- Jangan memakai gradien ungu/biru, glow neon, atau teks gradien.
- Jangan pakai tanda hubung panjang (em dash) di teks tampilan.
- Jangan menambah mode gelap atau warna kedua tanpa memperbarui berkas ini.
- Jangan menaruh teks isi di atas lapisan parallax atau di atas partikel yang terang.
- Jangan memberi kursor kustom pada layar sentuh atau saat reduce-motion.

---

## 8. Responsive

**Strategy:** Desktop-first dengan perubahan struktur di 900px.

| Element | Ponsel | Desktop |
|---|---|---|
| Navigasi | Bar bawah tetap, semua bagian | Sidebar kiri bernomor |
| Profil | Header ringkas (foto 128px) | Kartu profil holografik |
| Proyek | Kartu 78 sampai 86vw, mockup di atas | Rail horizontal dipin |
| Partikel 3D | Satu posisi tengah, redup | Bergeser ke sisi sesuai bagian |
| Form | Satu kolom | Dua kolom |

---

## 9. Agent Prompt Guide

**Saat membuat UI untuk proyek ini, agen harus:**
- Memakai token Bagian 2 sampai 6; jangan menulis hex atau px mentah baru.
- Mengutamakan komponen Bagian 4 sebelum membuat yang baru.
- Menerapkan Do's and Don'ts Bagian 7 sebagai aturan keras.

**Invariants:**
- Satu aksen `#FF4D1C`, satu tema terang, sudut kotak.
- Tiga font saja: Instrument Serif, DM Sans, DM Mono.
- Semua isi pribadi hanya di `src/content.ts`.
- Tombol keyboard skill: 1-9, 0, -, = untuk skill 1 sampai 12.

**Open questions:**
- Tahun "ITECNEFEST 2026" belum terkonfirmasi sertifikat.
- Ukuran mono kecil (0.6 sampai 0.8rem) belum disatukan jadi skala.
- Sisa token shadcn bawaan (`oklch`) masih ada di CSS dan tertimpa token situs.

---

## 10. Motion

**Durations:** 120ms · 200ms · 250ms (paling sering) · 300ms · 600ms · loader 1.1s

**Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` untuk semua transisi UI

**Signature transitions:** Intro dipin dengan tiga kalimat kinetik; Tentang menyala per kata; Skill dipin dan scroll memainkan keyboard; Proyek bergeser horizontal (bagian terpanjang, puncak); Layanan tersingkap (clip-path); Kontak kinetik. Partikel berganti bentuk per bagian.

**Reduced motion:** efek scroll dilewati, smooth-scroll mati, kalimat Intro ditumpuk, rail proyek jadi `overflow-x` biasa, kursor kustom dan animasi berkedip dimatikan.

---

## 11. Voice & Tone

**Voice:** Santai, jelas, rendah hati, bahasa Indonesia, orang pertama ("saya").

**Terminology:**

| Use | Avoid |
|---|---|
| Proyek / karya | Portfolio item |
| Murid kelas 11 | Pelajar profesional (klaim berlebih) |
| Hubungi saya | Contact us |

**Microcopy:** tombol = kata kerja singkat ("Lihat proyek", "Kirim pesan"); judul kalimat biasa bukan huruf besar semua; label mono saja yang kapital.
