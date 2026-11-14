/**
 * SEMUA ISI PERSONAL ADA DI SINI.
 * Teks biasa = contoh sementara. Teks dalam [kurung siku] = data fakta yang HARUS diisi Hizby.
 * (Jangan menambah angka/statistik karangan; hanya data asli.)
 */

export const PROFILE = {
  name: "Hizby Fauzan 'Aisyi",
  short: "Hizby",
  role: "Full Stack & Mobile Developer",
  intro: "Saya membuat antarmuka yang bergerak, bereaksi, dan terasa hidup.", // TODO
  roles: ["Full Stack Developer", "Mobile Developer"], // berganti dengan efek ketik di sidebar
  photo: "/foto-hizby.webp", // foto asli Hizby (public/foto-hizby.webp)
  year: 2026,
  github: "https://github.com/Aisyi-Hizby", // akun GitHub Hizby (cocokkan dengan Hizby)
};

export const INTRO = {
  // Tiga kalimat yang berganti saat bagian Intro dipin. Kalimat pertama = PROFILE.intro.
  cues: [
    "Dari layout yang rapi sampai animasi 3D yang merespons gerak tangan.",
    "Mari lihat karya-karyanya.",
  ],
};

export const ABOUT = {
  heading: "Merancang web yang tidak cuma dibaca, tapi dirasakan.",
  body: [
    "Saya Hizby, murid kelas 11 jurusan Rekayasa Perangkat Lunak di SMKIT As-Syifa Boarding School, Subang. Saya mengerjakan web dan aplikasi mobile, dari tampilan sampai server (full stack), dan senang mengubah ide jadi pengalaman yang bisa disentuh: geraknya halus dengan GSAP dan sesekali dibumbui 3D lewat WebGL.",
    "Salah satu karya saya, Digital CAGEUR, mengajak orang mengecilkan jejak digital demi bumi. Bersama Muhammad Farel Alghifary dan Razan Arrafi Maulana, kami membawanya ke lomba desain website ITECNEFEST 2026 yang diadakan Universitas Mandiri dan meraih Juara Harapan 1. Saya masih terus belajar, dan targetnya sederhana: membuat setiap proyek lebih baik dari yang sebelumnya.",
  ],
  facts: [
    { k: "Lokasi", v: "Subang, Jawa Barat" },
    { k: "Pendidikan", v: "SMKIT As-Syifa Boarding School, Subang" },
    { k: "Peran", v: "Murid kelas 11" },
    { k: "Fokus", v: "Rekayasa Perangkat Lunak" },
  ],
};

export const SKILLS: { name: string; note: string }[] = [
  // Berdasarkan karya dan keahlian yang disebut Hizby. `note` = kalimat singkat yang muncul saat diklik.
  { name: "React", note: "Memecah layar jadi potongan kecil yang rukun." },
  { name: "Next.js", note: "Dari halaman kosong sampai situs yang siap tayang." },
  { name: "Three.js", note: "Membuat browser mengira dirinya mesin game." },
  { name: "WebGL", note: "Berbicara langsung dengan GPU, tanpa basa-basi." },
  { name: "GSAP", note: "Gerak yang terasa pas, bukan sekadar bergerak." },
  { name: "Tailwind CSS", note: "Gaya yang konsisten tanpa pindah file." },
  { name: "Firebase", note: "Backend siap pakai, tinggal dihubungkan." },
  { name: "Flutter", note: "Satu basis kode untuk aplikasi di ponsel." },
  { name: "Figma", note: "Semua rapi di kanvas sebelum jadi kode." },
  { name: "UI / UX", note: "Dari sketsa kasar sampai layar yang enak dipakai." },
  { name: "Full Stack", note: "Dari tampilan sampai server, satu tangan." },
  { name: "Mobile Dev", note: "Aplikasi yang muat di saku." },
];

/** Tech stack yang terbukti dari karya Hizby (Digital CAGEUR, Master Dashboard, Lombaku, e-commerce Flutter). */
export const TECH = ["Next.js", "React", "Three.js", "React Three Fiber", "WebGL", "GSAP", "Tailwind CSS", "Vite", "Firebase", "Flutter", "Figma"];

export const PROJECTS: {
  kind: string;
  title: string;
  desc: string;
  tags: string[];
  href?: string; // isi kalau proyek sudah live
  image?: string; // opsional: screenshot desktop, mis. "/projects/satu.jpg" (taruh di /public/projects)
  mobileImage?: string; // opsional: screenshot ponsel, tampil sebagai mockup HP
  phones?: string[]; // opsional: beberapa screenshot layar ponsel (untuk desain aplikasi), tampil sebagai mockup HP
  linkLabel?: string; // opsional: teks tautan, default "Lihat live"
  mockRatio?: string; // opsional: rasio gambar mockup desktop, mis. "1440 / 900" (default 1440 / 760)
  mockPosition?: string; // opsional: posisi crop gambar, mis. "center" (default "top")
  award?: string; // opsional: prestasi, mis. "Juara 1, Nama Lomba"
  team?: string[]; // opsional: anggota tim
}[] = [
  // TODO: ganti dengan proyek asli
  {
    kind: "Kampanye lingkungan",
    title: "Digital CAGEUR",
    desc: "Situs kampanye Gerakan Digital Cageur: mengajak pengunjung mengecilkan jejak digital demi bumi, lengkap dengan globe 3D dan simulasi interaktif.",
    tags: ["Next.js", "React", "Three.js", "React Three Fiber", "Tailwind CSS"],
    href: "https://prodirplsmkitassyifa.site",
    image: "/projects/digital-cageur-desktop.jpg",
    mobileImage: "/projects/digital-cageur-mobile.jpg",
    award: "Juara Harapan 1 lomba desain website, ITECNEFEST 2026 Universitas Mandiri", // TODO: pastikan tahun 2026 dari sertifikat
    team: ["Hizby Fauzan 'Aisyi", "Muhammad Farel Alghifary", "Razan Arrafi Maulana"],
  },
  {
    kind: "Aplikasi web",
    title: "Master Dashboard",
    desc: "Dasbor pribadi serba-ada untuk mengelola keuangan, target penjualan, dan catatan kedisiplinan, lengkap dengan akun dan login Google.",
    tags: ["React", "Vite", "Tailwind CSS", "Firebase"],
    href: "https://master-dashboard-ruddy.vercel.app",
    image: "/projects/master-dashboard-desktop.jpg",
    mobileImage: "/projects/master-dashboard-mobile.jpg",
    mockRatio: "1440 / 900",
    mockPosition: "center",
  },
  {
    kind: "Desain UI/UX",
    title: "Lombaku",
    desc: "Rancangan aplikasi ponsel Lombaku: platform kompetisi dan prestasi untuk pelajar dan mahasiswa, dengan jelajah lomba, detail lomba, dan pelacak progres.",
    tags: ["Figma", "UI/UX", "Mobile App"],
    href: "https://www.figma.com/design/sMcwAIpGlTYNqfs854RMSG/Untitled?node-id=20-1822",
    linkLabel: "Lihat desain",
    phones: ["/projects/lombaku-1.png", "/projects/lombaku-2.png", "/projects/lombaku-3.png"],
  },
];

export const SERVICES: { title: string; front: string; desc: string }[] = [
  // TODO: sesuaikan layanan asli
  { title: "Website Portofolio", front: "Etalase yang bikin orang ingat.", desc: "Situs pribadi atau brand dengan identitas yang jelas dan animasi secukupnya." },
  { title: "Aplikasi Mobile", front: "Dari rancangan ke ponsel.", desc: "Aplikasi ponsel dengan antarmuka rapi, dari rancangan di Figma sampai bisa dijalankan." },
  { title: "Pengalaman 3D", front: "Web yang bisa disentuh.", desc: "Elemen 3D interaktif di browser: produk, visual, atau halaman bercerita." },
  { title: "Aplikasi Web", front: "Dari ide ke produk jalan.", desc: "Aplikasi dengan antarmuka rapi, dibangun bertahap dan mudah dirawat." },
];

export const CONTACT = {
  line: "Ada proyek yang mau dikerjakan bareng?",
  sub: "Ceritakan kebutuhanmu lewat form ini atau langsung lewat WhatsApp. Nanti kita diskusikan detailnya bareng-bareng.",
  email: "", // TODO: isi email asli kalau ada. Kosong = baris email disembunyikan, form kontak mengirim lewat WhatsApp
  whatsapp: "6281360099908", // format internasional tanpa +
  phone: "+62 813 6009 9908", // tampilan nomor di situs
  links: [
    // TODO: tautan asli
    { label: "GitHub", href: "https://github.com/Aisyi-Hizby" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

/** Urutan bagian & pengaturan dunia 3D di tiap bagian. */
export const SECTIONS = [
  { id: "intro", label: "Intro" },
  { id: "tentang", label: "Tentang" },
  { id: "skill", label: "Skill" },
  { id: "proyek", label: "Proyek" },
  { id: "layanan", label: "Layanan" },
  { id: "kontak", label: "Kontak" },
];
