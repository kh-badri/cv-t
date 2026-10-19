# CV Ta'aruf Digital - Khairul Badri

Landing page modern, syar'i, dan responsif untuk dokumen CV Ta'aruf Khairul Badri. Didesain elegan dengan nuansa warna *Light Blue & Midnight Navy*, tipografi bersih (*Plus Jakarta Sans*), dan mendukung akses optimal pada mobile maupun desktop, serta siap cetak 1 halaman penuh A4 Portrait.

---

## 🌟 Fitur Utama

1. **Keamanan & Privasi (Kode Akses / PIN)**:
   - Dilengkapi layar kunci (*Lock Screen Gate*) sebelum dokumen dapat dibaca atau dicetak.
   - **Kode Akses Default**: `11223344`
   - **Batas Sesi Akses**: 30 menit (otomatis terkunci kembali setelah 30 menit untuk keamanan privasi).
   - Tombol manual **Kunci** pada navbar untuk mengunci sesi kapan saja.

2. **Slider Foto Interaktif (2 Foto)**:
   - Geser/swipe foto dengan sentuhan (*touch gesture*) di HP maupun tombol panah di desktop.
   - Zoom/Lightbox: Klik pada foto untuk melihat foto secara penuh.
   - Mendukung format `.png` dan `.jpg` langsung tanpa teks overlay di foto.

3. **Desain Mobile-First & Navigasi Presisi**:
   - Tampilan proporsional di smartphone (Android & iPhone), tablet, maupun laptop/PC.
   - Navigasi navbar dengan *smooth scrolling* dan kompensasi tinggi sticky navbar sehingga judul tidak tertutup.

4. **Data Lengkap & Terstruktur**:
   - Identitas Personal & Karakteristik Fisik.
   - Pendidikan (S1 Teknik Informatika) & Pekerjaan (Staff NOC - IT).
   - Minat & Olahraga Favorit (Futsal, Lari, Sepeda, Berenang, Badminton).
   - Keagamaan & Pengamalan Ibadah.
   - Rencana Pernikahan (Target awal 2027, visi misi, tabungan menikah, status).
   - Kriteria Pasangan (Sholehah, baik, perhatian, penyabar).

5. **Fitur Ekspor / Cetak ke PDF (Presisi 1 Halaman A4 Portrait)**:
   - Tombol **"Cetak / Simpan PDF"** sudah dioptimasi khusus (`@media print`) tepat 1 halaman penuh A4 Portrait dengan 1 foto formal bersih.

6. **Tombol Kontak WhatsApp & Salin Link**:
   - Terhubung langsung ke WhatsApp dengan template pesan adab ta'aruf yang santun.
   - Tombol salin tautan CV dengan notifikasi toast.

---

## 🚀 Panduan Deploy ke cPanel

Untuk meng-online-kan proyek ini ke cPanel hosting:

### Cara 1: Menggunakan Git Version Control di cPanel
1. Masuk ke cPanel akun hosting Anda.
2. Buka menu **Git™ Version Control**.
3. Klik tombol **Create**.
4. Masukkan URL Repository:
   ```bash
   https://github.com/kh-badri/cv-t.git
   ```
5. Tentukan folder target (misalnya: `public_html` atau subdomain `taaruf.domainanda.com`).
6. Klik **Create** dan tunggu proses kloning selesai.

### Cara 2: Git Clone via SSH Terminal cPanel
1. Buka menu **Terminal** di cPanel.
2. Masuk ke folder web root:
   ```bash
   cd public_html
   ```
3. Lakukan git clone:
   ```bash
   git clone https://github.com/kh-badri/cv-t.git .
   ```
4. Website CV Ta'aruf sudah langsung live dan siap diakses!

---

## 🔒 Mengganti Kode Akses (PIN)

Jika ingin mengganti kode akses dari `11223344` menjadi kode lain:
1. Buka file `assets/js/main.js`.
2. Cari bagian berikut (baris ke-5):
   ```javascript
   const AUTH_CONFIG = {
     DEFAULT_KEY: '11223344', // Ganti dengan PIN yang Anda inginkan
     SESSION_DURATION_MS: 30 * 60 * 1000,
   ```
3. Ubah angka `'11223344'` sesuai keinginan Anda lalu simpan.

---

## 📷 Cara Mengganti Foto

Foto diletakkan di dalam folder `assets/images/`:
- **Foto 1**: `assets/images/foto1.png` (atau `foto1.jpg`)
- **Foto 2**: `assets/images/foto2.png` (atau `foto2.jpg`)

---

*Semoga Allah SWT mempermudah langkah dan ikhtiar baik menuju pernikahan yang sakinah, mawaddah, warahmah. Aamiin!*
