# Simple Blog

Simple Blog adalah proyek contoh full-stack sederhana: frontend Next.js dan backend Express.
README ini merapikan petunjuk menjalankan proyek, struktur singkat, dan API.

## Ringkasan singkat

- Frontend: Next.js (folder `frontend`)
- Backend: Express (folder `backend`)
- Data: disimpan sementara di `backend/data/data.json`

## Struktur proyek (ringkas)

Berikut adalah tampilan struktur proyek seperti keluaran perintah `tree` di terminal:

```text
simple-blog/
├─ backend/
│  ├─ server.js            # Express server & API endpoints
│  └─ data/
│     ├─ data.json         # Data posts & users
│     └─ user.json         # (opsional) contoh data user
├─ frontend/
│  ├─ app/
│  │  ├─ page.js           # Halaman login
+│  │  ├─ post/
│  │  │  ├─ page.js        # Daftar post
│  │  │  └─ [id]/
│  │  │     └─ page.js     # Detail post
│  │  └─ profile/
│  │     └─ page.js        # Halaman profil / tambah post
│  ├─ components/
│  │  ├─ navbar.js         # Navbar
│  │  ├─ postCard.js       # Card untuk setiap post
│  │  └─ postForm.js       # Form tambah post
│  ├─ public/              # Static assets
│  ├─ globals.css          # Styling global
│  └─ next.config.mjs      # Konfigurasi Next.js
├─ README.md               # Dokumentasi proyek (ini)
└─ package.json            # (opsional) root package (jika ada)
```

Catatan: struktur di atas menyorot file/ folder utama yang relevan; beberapa file kecil atau konfigurasi mungkin tidak dicantumkan.

## Kebutuhan (requirements)

- Node.js (disarankan v16+)
- npm / yarn / pnpm

Port default yang digunakan:

- Backend: 5050
- Frontend: 3000

## Menjalankan proyek (lokal)

1. Jalankan backend

```bash
cd backend
npm install
node server.js
```

Backend akan tersedia di: http://localhost:5050

2. Jalankan frontend (di terminal lain)

```bash
cd frontend
npm install
npm run dev
```

Frontend Next.js akan tersedia di: http://localhost:3000

Catatan: jika menggunakan `yarn` atau `pnpm`, ganti perintah `npm` yang sesuai.

## API (ringkasan)

Semua endpoint utama ada di `backend/server.js`:

- POST /login — autentikasi sederhana (mengembalikan token & author_id)
- GET /user/:id — ambil data user
- GET /posts — ambil semua post
- GET /posts/:id — ambil detail post
- POST /posts — tambah post baru (perlindungan header: Authorization: `Bearer ${ADMIN_TOKEN}`)

## Alur singkat penggunaan

1. Buka http://localhost:3000 dan login dengan user yang ada pada `backend/data/data.json`.
2. Token dan `author_id` disimpan di sessionStorage setelah login.
3. Gunakan halaman `/post` untuk melihat daftar post dan klik untuk melihat detail.
4. Untuk menambah post, buka `/profile` dan isi formulir (perlu token/otentikasi sesuai server).

## Catatan teknis

- Token admin disimpan sebagai konstanta (`ADMIN_TOKEN`) pada server — ini untuk demo saja, jangan dipakai di produksi.
- Perubahan post disimpan ke file JSON lokal via fungsi `savePosts` di `backend/server.js`.
- CORS diaktifkan sehingga frontend dapat mengakses backend di host yang sama atau berbeda.
