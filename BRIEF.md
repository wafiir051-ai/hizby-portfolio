# BRIEF: Portofolio Hizby Fauzan 'Aisyi

> **Revisi (referensi dari user):** user mengirim contoh portofolio konvensional (sidebar profil, Tentang, Skill, Proyek, Layanan, Kontak) dan minta "kayak gini, tapi dibedain". Situs diubah dari scroll-jacking murni menjadi portofolio 6 bagian dengan scroll normal. Yang dipertahankan: dunia 3D satu awan partikel (nama, bola, simpul, heliks, cincin) yang berganti wujud mengikuti bagian yang dibaca. Yang berbeda dari contoh: dock navigasi mengambang (bukan sidebar), kartu foto 3D miring, bola kata 3D (bukan keyboard), tumpukan kartu proyek, kartu layanan yang bisa dibalik, palet hijau zamrud + amber.

> Self-authored under explicit creative delegation (user: "full animasi 3D", boleh cari referensi sendiri).
> Belum diwawancara. Semua isi personal (peran, bio, proyek, kontak) adalah PLACEHOLDER di `src/content.ts`.

## Delapan topik
1. **Vibe:** hangat-pekat (hijau zamrud), hidup, presisi, sedikit playful. Referensi: lukisan cahaya long-exposure, film "Tron: Legacy" (grid + partikel), poster typografi Swiss.
2. **Perjalanan scroll:** Intro (nama) → Tentang → Keahlian → Karya (3 proyek) → Kontak.
3. **Kurva energi:** tenang-memikat → hangat → ritmis → intens (puncak) → tenang dan tuntas.
4. **Kurva rasa** dan **puncak**: lihat bawah.
5. **Hal yang belum pernah ada di situs lain (signature move):** seluruh situs adalah SATU awan 24 ribu partikel yang berganti wujud di tiap bab (nama → bola → simpul torus → heliks → cincin), bisa ditolak kursor dan diledakkan dengan klik, lalu menyusun diri persis kembali.
6. **Estetika:** Playful-tech, latar hijau zamrud (user: jangan hitam, jangan biru; warna diserahkan ke Claude). Satu aksen: kuning amber (#ffc93c). Bukan ungu, bukan krem-kuningan artisan.
7. **Satu dunia atau banyak adegan:** SATU DUNIA (grammar: Continuous world, versi real-time WebGL, bukan rantai video).
8. **Aset:** tidak ada. Semua dihasilkan dari kode (three.js), tanpa gambar generatif.

## Grammar
**Continuous world.** Satu kanvas fixed selama seluruh scroll. Tidak ada section di aliran dokumen, hanya spacer. Teks muncul di layer fixed pada waypoint. Navigasi = peta waypoint (rail kanan, bisa diklik). Penutup = tiba di cincin (portal) di kanvas yang sama.
Tujuh grammar lain kalah karena: filmic one-shot butuh klip video (tidak ada aset); editorial/poster/cutlist menolak 3D real-time sebagai tulang punggung; gallery cocok untuk karya tapi tidak membawa "dunia"; live surface dan split stage tidak relevan untuk portofolio pribadi.

## Kurva rasa
| Waypoint | Rasa | Penyebab di layar |
|---|---|---|
| Intro | Takjub, penasaran | Nama terbentuk dari ribuan partikel yang bergetar, kursor menyibaknya |
| Tentang | Hangat, dekat | Nama melebur jadi bola yang berputar pelan, teks besar di kiri |
| Keahlian | Ritmis, bertenaga | Bola terpilin jadi simpul torus; daftar keahlian "didekripsi" |
| Karya (PUNCAK) | Terbenam, bangga | Kamera MASUK ke dalam heliks partikel yang berputar mengelilingi pengunjung; tiga proyek bergantian |
| Kontak | Lega, tuntas | Heliks menutup jadi cincin sempurna menghadap pengunjung; kamera mundur dan diam |

## Puncak
"Pas scroll ke karya, tiba-tiba kita masuk ke dalam pusaran partikel dan proyeknya muncul satu per satu di sekeliling kita." Hidup di waypoint **Karya**, rentang scroll terpanjang (~36% dari total, ~324vh), didahului Keahlian yang lebih pendek dan lebih tenang.

## Kalimat "ini situs yang ..."
"Ini situs di mana seluruh portofolionya adalah satu awan partikel yang kamu bisa sentuh."

## Hening yang disengaja
Dua jeda tahan (hold) tanpa perubahan bentuk: akhir Tentang dan awal Kontak. Itu bukan dead scroll.

## Fingerprint (registry kosong, gate otomatis lolos)
Grammar: Continuous world (real-time) · Nav: peta waypoint kanan · Hero: nama dari partikel · Urutan: 5 wujud partikel, 7 panel, ~9 viewport · Close: cincin portal + email · Signature: awan partikel satu-tubuh yang bisa ditolak dan diledakkan.

## Skor scroll (scroll-craft, revisi terakhir)
Grammar akhir: portofolio 6 bagian dengan sidebar tetap (struktur mengikuti contoh dari user), scroll dipandu oleh perangkat yang berbeda tiap bagian. Kode: `src/lib/scrollScore.ts`.

| Bagian | Perangkat | Rasa | Penyebab di layar |
|---|---|---|---|
| Intro | pin + kinetic | penasaran | tiga kalimat berganti, kata naik dari balik masker |
| Tentang | teks menyala per kata | dekat | paragraf "dibaca" oleh scroll, fakta masuk bergantian |
| Skill | pin + signature move | ritmis, playful | scroll memainkan keyboard 3D sendiri, tombol/klik mengambil alih |
| Proyek (PUNCAK) | pan | bangga | scroll vertikal menggeser rail proyek horizontal; rentang terpanjang (~4,9 viewport) |
| Layanan | reveal (clip-path) | tenang, jelas | kartu tersingkap dari empat tepi berbeda |
| Kontak | kinetic | lega, tuntas | judul menyusun diri, form menyusul |

Latar: grid ikut bergeser (parallax tipis) dan garis progres aksen di tepi sidebar sebagai playhead.
Tema: terang (putih tulang #EEEBE3, tinta #111, aksen #FF4D1C), permintaan user "bg warna modern".
Catatan verifikasi: pan overflow terukur +1671px (sehat); spacer pin Intro 2720px, Skill 3040px, Proyek 3975px.
