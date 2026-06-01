# FuelGuard - Fuel Management Dashboard

FuelGuard adalah web app dashboard untuk monitoring konsumsi bahan bakar armada kendaraan.

Project ini mencakup:
- Dashboard KPI dan ringkasan alert
- Fleet management (tabel kendaraan, modal detail, status kesehatan sistem)
- Fuel refueling logs
- Driver management
- Maintenance logs
- Reports & analytics
- Settings dan Support page
- Login page, routing, notification drawer, dan quick action modal

## Tech Stack

- React + Vite
- React Router
- Zustand
- Recharts
- Tailwind CSS

## Requirements

- Node.js 18+ (disarankan Node.js 20+)
- npm 9+

## Quick Start

Install dependency:

```bash
npm install
```

Siapkan database PostgreSQL `kbt` terlebih dahulu lewat folder `database/`:

1. Jalankan `database/01_create_database.sql`
2. Connect ke database `kbt`
3. Jalankan `database/02_schema.sql`
4. Jalankan `database/03_seed.sql`


Jalankan development server:

```bash
npm run dev
```

Jalankan backend API:

```bash
npm run server:dev
```

Backend membaca PostgreSQL dari file `.env.local` di root project dan mengekspor API di `http://127.0.0.1:3001`.

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Demo Login

Di halaman login, gunakan password berikut:

- Password: `admin`

Email bebas (contoh: `fleet@company.com`).

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run server` - start Express API
- `npm run server:dev` - start Express API with nodemon
- `npm run build` - production build
- `npm run lint` - jalankan ESLint
- `npm run preview` - preview production build

## API Endpoints

- `GET /api/health`
- `GET|POST|PUT|DELETE /api/vehicles`
- `GET|POST|PUT|DELETE /api/drivers`
- `GET|POST|PUT|DELETE /api/fuel-logs`
- `GET|POST|PUT|DELETE /api/maintenance-logs`

Saat `npm run dev` berjalan, request ke `/api/*` akan diproxy ke backend Express.

## Routes

- `/login`
- `/dashboard`
- `/fleet`
- `/operations`
- `/reports`
- `/settings`
- `/support`

## Struktur Folder (Ringkas)

```text
src/
	components/
		dashboard/
		fleet/
		layout/
		reports/
		settings/
		support/
		ui/
	data/
	pages/
	store/
	styles/
	App.jsx
	main.jsx
```

## Catatan

- Frontend sekarang membaca data operasional dari API Express, bukan hanya dari mock/local storage.
- State UI global masih disimpan di store `src/store/useUIStore.js`.
- App dibungkus `ToastProvider` di `src/main.jsx` untuk notifikasi global.
