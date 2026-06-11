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
        monitoring: 'FUEL MONITORING SYSTEM'
      },
      login: {
        welcomeBack: 'Welcome back',
        signInTo: 'Sign in to FMS v2.0',
        email: 'Email',
        password: 'Password',
        invalidCredentials: 'Invalid credentials',
        signIn: 'Sign in',
        footer: 'FMS v2.0'
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
      support: {
        title: 'How can we help you today?',
        subtitle: 'Access documentation, submit tickets, or browse our knowledge base for fuel management best practices.',
        docTech: 'Technical Documentation',
        docTechDesc: 'Deep dive into sensor configurations and hardware specs.',
        docVideo: 'Video Tutorials',
        docVideoDesc: 'Step-by-step visual guides for system setup.',
        docAPI: 'API Reference',
        docAPIDesc: 'Integration guide for third-party ERP systems.',
        docChangelog: 'Changelog',
        docChangelogDesc: 'Latest firmware and software updates.',
        getInTouch: 'Get in Touch',
        getInTouchDesc: 'Submit a ticket and our team will respond promptly.',
        inquiryType: 'Inquiry Type',
        hwFailure: 'Hardware Failure',
        swBug: 'Software Bug',
        dataIssue: 'Data Issue',
        general: 'General',
        vehicleID: 'Vehicle / Asset ID',
        vehicleIDPlaceholder: 'e.g. TRUCK-084',
        probDesc: 'Problem Description',
        submit: 'Submit Ticket',
        hotline: 'Average Response 1.5 Hours · 24/7 HOTLINE +1 (800) FUEL-SOS',
        req: 'Required',
        ticketSub: 'Ticket {{ticket}} submitted. Response within 1.5 hours.',
        faqTitle: 'FREQUENTLY ASKED QUESTIONS',
        faqs: [
          { question: 'How do I calibrate my fuel sensors?', answer: 'Go to Settings > Vehicle Settings, select your vehicle, and click the "Calibrate" button. Ensure the vehicle is on a flat surface and the tank is at a known level.' },
          { question: 'Can I export reports to Excel?', answer: 'Yes. In the Analytics & Reports module, click the "Export" button in the top right and choose CSV/Excel format.' },
          { question: 'What is the latency on fuel level updates?', answer: 'Under the standard telemetry profile, updates arrive every 30 seconds. You can increase this to 10 seconds in Settings, but it will consume more data.' },
          { question: 'How do I add a new operator?', answer: 'Navigate to Operations Center > Drivers tab, and click "+ Add Driver". Fill in their details and assign them an active vehicle.' },
          { question: 'What to do when a sensor disconnects?', answer: 'Check the vehicle battery and the sensor wiring harness. If the hardware is intact, try restarting the telemetry unit via the Vehicle Modal in Fleet Inventory.' }
        ]
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
        monitoring: 'FUEL MONITORING SYSTEM'
      },
      login: {
        welcomeBack: 'Selamat datang kembali',
        signInTo: 'Masuk ke FMS v2.0',
        email: 'Email',
        password: 'Kata Sandi',
        invalidCredentials: 'Kredensial tidak valid',
        signIn: 'Masuk',
        footer: 'FMS v2.0'
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
      support: {
        title: 'Bagaimana kami bisa membantu Anda hari ini?',
        subtitle: 'Akses dokumentasi, kirim tiket, atau telusuri basis pengetahuan kami untuk praktik terbaik manajemen bahan bakar.',
        docTech: 'Dokumentasi Teknis',
        docTechDesc: 'Penyelaman mendalam tentang konfigurasi sensor dan spesifikasi perangkat keras.',
        docVideo: 'Tutorial Video',
        docVideoDesc: 'Panduan visual langkah demi langkah untuk pengaturan sistem.',
        docAPI: 'Referensi API',
        docAPIDesc: 'Panduan integrasi untuk sistem ERP pihak ketiga.',
        docChangelog: 'Catatan Perubahan',
        docChangelogDesc: 'Pembaruan firmware dan perangkat lunak terbaru.',
        getInTouch: 'Hubungi Kami',
        getInTouchDesc: 'Kirim tiket dan tim kami akan segera merespons.',
        inquiryType: 'Jenis Pertanyaan',
        hwFailure: 'Kegagalan Perangkat Keras',
        swBug: 'Bug Perangkat Lunak',
        dataIssue: 'Masalah Data',
        general: 'Umum',
        vehicleID: 'ID Kendaraan / Aset',
        vehicleIDPlaceholder: 'mis. TRUCK-084',
        probDesc: 'Deskripsi Masalah',
        submit: 'Kirim Tiket',
        hotline: 'Rata-rata Respon 1.5 Jam · 24/7 HOTLINE +1 (800) FUEL-SOS',
        req: 'Wajib',
        ticketSub: 'Tiket {{ticket}} terkirim. Respon dalam 1,5 jam.',
        faqTitle: 'PERTANYAAN YANG SERING DIAJUKAN',
        faqs: [
          { question: 'Bagaimana cara kalibrasi sensor bahan bakar?', answer: 'Pergi ke Pengaturan > Pengaturan Kendaraan, pilih kendaraan Anda, dan klik tombol "Kalibrasi". Pastikan kendaraan berada di permukaan yang rata dan tangki berada pada tingkat yang diketahui.' },
          { question: 'Bisakah saya mengekspor laporan ke Excel?', answer: 'Ya. Di modul Analitik & Laporan, klik tombol "Ekspor" di kanan atas dan pilih format CSV/Excel.' },
          { question: 'Berapa latensi pada pembaruan tingkat bahan bakar?', answer: 'Di bawah profil telemetri standar, pembaruan tiba setiap 30 detik. Anda dapat meningkatkannya menjadi 10 detik di Pengaturan, tetapi akan memakan lebih banyak data.' },
          { question: 'Bagaimana cara menambahkan operator baru?', answer: 'Arahkan ke Pusat Operasi > tab Pengemudi, dan klik "+ Tambah Pengemudi". Isi detail mereka dan tetapkan kendaraan aktif.' },
          { question: 'Apa yang harus dilakukan saat sensor terputus?', answer: 'Periksa baterai kendaraan dan harnes kabel sensor. Jika perangkat keras masih utuh, coba mulai ulang unit telemetri melalui Modal Kendaraan di Inventaris Armada.' }
        ]
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
