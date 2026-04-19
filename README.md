# 🚀 Firdaus Zickrian Portfolio

Website portfolio interaktif berbasis React + Vite untuk menampilkan profile, project case study, experience, tech stack, GitHub stats, dan AI terminal chat.

> Jika project ini bermanfaat, jangan lupa kasih **⭐ Star** ya. Makasih banyak! 🙌

## ✨ Highlight

- 🎬 Animasi modern dengan **GSAP + ScrollTrigger** (single animation engine).
- 🧭 Smooth scrolling pakai **Lenis**.
- 🗂️ Project gallery + modal detail project dengan route.
- 🤖 Chat widget terminal style (`help`, `ls`, `cat <slug>`, dll).
- ⚡ Lazy-loaded sections biar loading tetap ringan.

## 🧱 Tech Stack

- React 19
- Vite
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis
- React Router

## ✅ Prasyarat

- Node.js **22+**
- npm **10+**

## 🛠️ Cara Pakai Dari Awal Sampai Akhir

### 1) Clone repository

```bash
git clone <url-repo-kamu>
cd PortofolioWeb
```

### 2) Install dependency

```bash
npm install
```

### 3) Setup environment variable

```bash
cp .env.example .env
```

Isi `.env` jika mau aktifkan AI chat response:

```env
VITE_CEREBRAS_API_KEY=your_key_here
```

Catatan:
- Kalau tanpa API key, terminal command lokal tetap jalan normal ✅
- `REACT_APP_CEREBRAS_API_KEY` masih diterima, tapi disarankan pakai `VITE_CEREBRAS_API_KEY`

### 4) Jalankan mode development

```bash
npm run dev
```

Buka URL dari Vite (biasanya `http://localhost:5173`).

### 5) Build production

```bash
npm run build
```

Output build ada di folder `build/`.

### 6) Preview hasil build lokal

```bash
npm run preview
```

### 7) Cek sebelum deploy

```bash
npm run check
```

Perintah ini menjalankan:
- build production
- audit dependency production

### 8) Deploy

Deploy isi folder `build/` ke hosting statis (Netlify, Vercel, Cloudflare Pages, dll).

Penting untuk routing SPA:
- pastikan fallback route diarahkan ke `index.html`
- ini diperlukan untuk route seperti `/projects/:slug`

## 🗂️ Struktur Project

```text
.
├── index.html
├── public/
├── src/
│   ├── components/
│   ├── components/projects/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── projectDetails/
│   ├── services/
│   └── utils/
├── tailwind.config.js
└── vite.config.js
```

## ✍️ Cara Edit Konten Portfolio

Kalau mau ubah konten tanpa bongkar layout, fokus di file ini:

- Data umum (profile, experience, dll): `src/data/portfolioData.js`
- Data kartu project gallery: `src/data/projectMeta.js`
- Data detail project untuk chat `cat <slug>`: `src/data/projectDetailsData.js`
- Registry section chat: `src/data/sectionRegistry.js`
- Halaman detail per project: `src/projectDetails/`

### ➕ Menambah project baru

1. Tambah metadata project di `src/data/projectMeta.js`
2. Tambah detail project dengan `slug` yang sama di `src/data/projectDetailsData.js`
3. (Opsional) Buat halaman detail custom di `src/projectDetails/`
4. Register halaman custom di `src/projectDetails/projectRegistry.js`

## 🖼️ Asset Penting

- Foto About: `public/profilee.webp`
- Foto preload hero: `public/profile.webp`
- Gambar OG/Twitter: `public/og-icon.png`
- Galeri hackathon: `public/hackathon-base/`
- File CV: `public/cv.pdf`

## 💬 Chat Widget

Mode chat:

- Command lokal: selalu aktif
- AI response: aktif kalau `VITE_CEREBRAS_API_KEY` tersedia

Command yang tersedia:

- `help`
- `ls`
- `cat <slug>`
- `history`
- `clear`

## 🎞️ Catatan Animasi

Project ini sudah pakai **GSAP-only** untuk animasi (termasuk wrapper internal GSAP), jadi stack animasi tetap konsisten dan lebih gampang dirawat.

## 🧯 Troubleshooting

- AI tidak merespon: cek `.env` dan restart dev server
- Command chat jalan tapi AI gagal: biasanya API key/limit/network
- CV tidak sesuai: ganti `public/cv.pdf`
- GitHub stats kosong: kemungkinan rate limit API publik

## 📜 License

Saat ini repository belum menyertakan lisensi open-source.

---

Kalau kamu suka project ini, bantu dukung dengan **⭐ Star** repo-nya ya. Bikin semangat untuk update fitur baru 😄🔥
