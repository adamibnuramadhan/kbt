# FuelGuard - Fuel Management Dashboard

FuelGuard adalah web app dashboard untuk monitoring konsumsi bahan bakar armada kendaraan.

Project ini mencakup:
- Dashboard KPI dan ringkasan alert
- Fleet management (tabel kendaraan, modal detail, status kesehatan sistem)
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

Jalankan development server:

```bash
npm run dev
```

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
- `npm run build` - production build
- `npm run lint` - jalankan ESLint
- `npm run preview` - preview production build

## Routes

- `/login`
- `/dashboard`
- `/fleet`
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

- Data masih menggunakan mock data pada `src/data/mockData.js`.
- State UI global disimpan di store `src/store/useUIStore.js`.
- App dibungkus `ToastProvider` di `src/main.jsx` untuk notifikasi global.
