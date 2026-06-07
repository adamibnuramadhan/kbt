import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import useUIStore from './store/useUIStore'

const resources = {
  en: {
    translation: {
      sidebar: {
        overview: 'Overview',
        fleet: 'Fleet',
        operations: 'Operations',
        reports: 'Reports',
        settings: 'Settings',
        support: 'Support',
        navigation: 'Navigation',
        noResults: 'No results',
        logout: 'Logout',
        monitoring: 'MONITORING'
      },
      login: {
        welcomeBack: 'Welcome back',
        signInTo: 'Sign in to FuelGuard',
        email: 'Email',
        password: 'Password',
        invalidCredentials: 'Invalid credentials',
        signIn: 'Sign in',
        footer: 'FuelGuard v2.0 · Fuel Monitoring System'
      },
      dashboard: {
        greeting: 'Good morning, Pratama',
        systemNormal: 'System diagnostics are normal. Fleet efficiency up 4.2% this week.',
        totalFuel: 'TOTAL FUEL USED TODAY',
        avgEfficiency: 'AVERAGE EFFICIENCY',
        activeVehicles: 'ACTIVE VEHICLES',
        estSavings: 'EST. SAVINGS',
        liters: 'Liters',
        units: 'Units',
        vsYesterday: '-12% vs yesterday'
      },
      fleet: {
        title: 'Fleet Inventory',
        subtitle: 'Manage and monitor your vehicles',
        addVehicle: '+ Add Vehicle',
        export: 'Export',
        all: 'All',
        lowFuel: 'Low Fuel',
        moving: 'Moving',
        idle: 'Idle',
        total: 'Total',
        active: 'Active',
        avgEff: 'Avg Efficiency'
      },
      operations: {
        title: 'Operations Center',
        subtitle: 'Fuel, Driver, and Maintenance Logs',
        desc: 'Centralized CRUD for fuel logs, active drivers, and vehicle maintenance schedules.',
        fuelLogs: 'Fuel Logs',
        drivers: 'Drivers',
        maintenance: 'Maintenance'
      },
      reports: {
        title: 'Analytics & Reports',
        subtitle: 'Comprehensive insights into fleet performance and efficiency',
        exportReport: 'Export Report',
        last7Days: 'Last 7 Days',
        last30Days: 'Last 30 Days',
        thisQuarter: 'This Quarter',
        thisYear: 'This Year'
      },
      settings: {
        title: 'Settings',
        subtitle: 'Manage preferences',
        menu: {
          account: 'Account',
          notifications: 'Notifications',
          users: 'Users',
          vehicles: 'Vehicles',
          appearance: 'Appearance'
        },
        accountPrefs: 'Account Preferences',
        accountPrefsDesc: 'Update profile and company information.',
        notifSettings: 'Notification Settings',
        notifLowFuel: 'Critical Low Fuel Warning (<10%)',
        notifUnauthorized: 'Unauthorized Access Attempt',
        notifWeekly: 'Weekly Efficiency Report',
        interfaceTheme: 'Interface Theme',
        darkMode: 'Dark Mode',
        lightMode: 'Light Mode',
        telemetryRefresh: 'Telemetry Refresh',
        telemetryStandard: 'Standard (30 seconds)',
        telemetryFast: 'Fast (10 seconds)',
        telemetrySlow: 'Slow (60 seconds)',
        userMgmt: 'User Management',
        addOperator: '+ Add Operator',
        vehicleSettings: 'Vehicle Settings',
        vehicleSettingsDesc: 'Hardware & sensor calibration, fuel probe settings, and telemetry routing.',
        capSecure: 'Cap-Secure Sensors',
        status: 'Status',
        calibrated: 'Calibrated',
        gpsMesh: 'GPS Mesh Sync',
        signalStrength: 'Signal Strength 92% · Encryption AES-256',
        theme: 'Theme',
        sidebarWidth: 'Sidebar Width',
        widthDefault: '248px (default)',
        widthSmall: '200px',
        widthLarge: '320px',
        language: 'Language'
      }
    }
  },
  id: {
    translation: {
      sidebar: {
        overview: 'Ringkasan',
        fleet: 'Armada',
        operations: 'Operasi',
        reports: 'Laporan',
        settings: 'Pengaturan',
        support: 'Dukungan',
        navigation: 'Navigasi',
        noResults: 'Tidak ada hasil',
        logout: 'Keluar',
        monitoring: 'PEMANTAUAN'
      },
      login: {
        welcomeBack: 'Selamat datang kembali',
        signInTo: 'Masuk ke FuelGuard',
        email: 'Email',
        password: 'Kata Sandi',
        invalidCredentials: 'Kredensial tidak valid',
        signIn: 'Masuk',
        footer: 'FuelGuard v2.0 · Sistem Pemantauan Bahan Bakar'
      },
      dashboard: {
        greeting: 'Selamat pagi, Pratama',
        systemNormal: 'Diagnostik sistem normal. Efisiensi armada naik 4,2% minggu ini.',
        totalFuel: 'TOTAL BBM HARI INI',
        avgEfficiency: 'RATA-RATA EFISIENSI',
        activeVehicles: 'KENDARAAN AKTIF',
        estSavings: 'ESTIMASI PENGHEMATAN',
        liters: 'Liter',
        units: 'Unit',
        vsYesterday: '-12% vs kemarin'
      },
      fleet: {
        title: 'Inventaris Armada',
        subtitle: 'Kelola dan pantau kendaraan Anda',
        addVehicle: '+ Tambah Kendaraan',
        export: 'Ekspor',
        all: 'Semua',
        lowFuel: 'BBM Rendah',
        moving: 'Bergerak',
        idle: 'Diam',
        total: 'Total',
        active: 'Aktif',
        avgEff: 'Rata-rata Efisiensi'
      },
      operations: {
        title: 'Pusat Operasi',
        subtitle: 'Log BBM, Pengemudi, dan Perawatan',
        desc: 'CRUD terpusat untuk log pengisian BBM, pengemudi aktif, dan jadwal servis kendaraan.',
        fuelLogs: 'Log BBM',
        drivers: 'Pengemudi',
        maintenance: 'Perawatan'
      },
      reports: {
        title: 'Analitik & Laporan',
        subtitle: 'Wawasan komprehensif tentang kinerja dan efisiensi armada',
        exportReport: 'Ekspor Laporan',
        last7Days: '7 Hari Terakhir',
        last30Days: '30 Hari Terakhir',
        thisQuarter: 'Kuartal Ini',
        thisYear: 'Tahun Ini'
      },
      settings: {
        title: 'Pengaturan',
        subtitle: 'Kelola preferensi',
        menu: {
          account: 'Akun',
          notifications: 'Notifikasi',
          users: 'Pengguna',
          vehicles: 'Kendaraan',
          appearance: 'Tampilan'
        },
        accountPrefs: 'Preferensi Akun',
        accountPrefsDesc: 'Perbarui profil dan informasi perusahaan.',
        notifSettings: 'Pengaturan Notifikasi',
        notifLowFuel: 'Peringatan Bahan Bakar Kritis (<10%)',
        notifUnauthorized: 'Upaya Akses Tidak Sah',
        notifWeekly: 'Laporan Efisiensi Mingguan',
        interfaceTheme: 'Tema Antarmuka',
        darkMode: 'Mode Gelap',
        lightMode: 'Mode Terang',
        telemetryRefresh: 'Pembaruan Telemetri',
        telemetryStandard: 'Standar (30 detik)',
        telemetryFast: 'Cepat (10 detik)',
        telemetrySlow: 'Lambat (60 detik)',
        userMgmt: 'Manajemen Pengguna',
        addOperator: '+ Tambah Operator',
        vehicleSettings: 'Pengaturan Kendaraan',
        vehicleSettingsDesc: 'Kalibrasi perangkat keras & sensor, pengaturan probe bahan bakar, dan perutean telemetri.',
        capSecure: 'Sensor Tutup Aman',
        status: 'Status',
        calibrated: 'Dikalibrasi',
        gpsMesh: 'Sinkronisasi Mesh GPS',
        signalStrength: 'Kekuatan Sinyal 92% · Enkripsi AES-256',
        theme: 'Tema',
        sidebarWidth: 'Lebar Bilah Samping',
        widthDefault: '248px (bawaan)',
        widthSmall: '200px',
        widthLarge: '320px',
        language: 'Bahasa'
      }
    }
  }
}

// Ensure the initial language matches the store
const initialLanguage = useUIStore.getState().language || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
