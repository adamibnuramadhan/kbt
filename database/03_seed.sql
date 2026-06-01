-- Run this after 02_schema.sql inside the fuelguard database.

INSERT INTO vehicles (id, plate_number, type, driver_name, driver_phone, location, fuel_level, fuel_capacity, efficiency, status, last_updated, mileage, next_service) VALUES
('VHL-7829-X', 'B 2891 XAA', 'Truck', 'Marcus Holloway', '+62-812-3456-7890', 'Jl. Raya Bekasi KM-24', 85, 300, 8.2, 'moving', '2 menit lalu', 142850, '2026-06-15'),
('VHL-4410-T', 'B 4410 TPK', 'Truck', 'Sarah Jenkins', '+62-811-2244-9931', 'Fueling Station #4', 12, 300, 9.1, 'idle', 'Baru saja', 186420, '2026-05-28'),
('VHL-1192-M', 'B 1192 MLR', 'Van', 'David Chen', '+62-813-5566-1188', 'I-95 Southbound', 64, 90, 7.8, 'moving', '15 menit lalu', 81245, '2026-07-05'),
('VHL-5522-Y', 'B 5522 YNH', 'Truck', 'Emily Blunt', '+62-822-3344-7711', 'Main Depot - Bay 2', 100, 350, 8.0, 'offline', '4 jam lalu', 204112, '2026-06-02'),
('VHL-9904-A', 'D 9904 ALW', 'Van', 'Ayu Maharani', '+62-813-7788-9900', 'Pasteur, Bandung', 43, 80, 9.4, 'moving', '9 menit lalu', 66301, '2026-06-20'),
('VHL-8301-B', 'B 8301 FZN', 'Truck', 'Andi Nugroho', '+62-821-4455-6677', 'Pelabuhan Tanjung Priok', 58, 280, 7.8, 'idle', '22 menit lalu', 155700, '2026-06-30'),
('VHL-6721-Q', 'B 6721 QRT', 'Van', 'Nadia Putri', '+62-812-9090-1212', 'Sentul City, Bogor', 72, 85, 8.9, 'moving', '6 menit lalu', 90770, '2026-07-12'),
('VHL-3108-E', 'B 3108 EDK', 'Truck', 'Fajar Hidayat', '+62-878-3322-5566', 'Cilegon Industrial Area', 39, 260, 7.5, 'moving', '14 menit lalu', 168532, '2026-06-11'),
('VHL-2044-U', 'B 2044 UCP', 'Truck', 'Rian Maulana', '+62-821-9900-7744', 'Kawasan MM2100, Cibitung', 27, 300, 7.0, 'idle', '31 menit lalu', 194883, '2026-05-31'),
('VHL-5588-J', 'B 5588 JMX', 'Van', 'Lina Anggraini', '+62-857-6633-1122', 'Cimahi Tech Hub', 81, 75, 9.7, 'moving', '4 menit lalu', 71344, '2026-07-28'),
('VHL-9033-L', 'B 9033 LHA', 'Truck', 'Gilang Ramadhan', '+62-813-1199-5544', 'Pulogadung Distribution Center', 51, 320, 8.1, 'moving', '11 menit lalu', 129010, '2026-06-18'),
('VHL-4477-N', 'B 4477 NTP', 'Van', 'Maya Salsabila', '+62-812-8866-2255', 'Depok City Warehouse', 34, 85, 8.6, 'moving', '18 menit lalu', 84522, '2026-06-24')
ON CONFLICT (id) DO NOTHING;

INSERT INTO drivers (id, name, license_number, phone, license_expiry, status, assigned_vehicle_id) VALUES
('DRV-101', 'Marcus Holloway', 'SIM-9021-X', '+62-812-3456-7890', '2027-05-12', 'active', 'VHL-7829-X'),
('DRV-102', 'Sarah Jenkins', 'SIM-3341-T', '+62-811-2244-9931', '2026-11-20', 'active', 'VHL-4410-T'),
('DRV-103', 'David Chen', 'SIM-1192-M', '+62-813-5566-1188', '2028-02-15', 'active', 'VHL-1192-M'),
('DRV-104', 'Emily Blunt', 'SIM-5522-Y', '+62-822-3344-7711', '2025-09-10', 'active', 'VHL-5522-Y'),
('DRV-105', 'Ayu Maharani', 'SIM-9904-A', '+62-813-7788-9900', '2029-01-30', 'active', 'VHL-9904-A'),
('DRV-106', 'Andi Nugroho', 'SIM-8301-B', '+62-821-4455-6677', '2026-06-22', 'inactive', 'VHL-8301-B'),
('DRV-107', 'Nadia Putri', 'SIM-6721-Q', '+62-812-9090-1212', '2027-12-05', 'active', 'VHL-6721-Q'),
('DRV-108', 'Fajar Hidayat', 'SIM-3108-E', '+62-878-3322-5566', '2025-10-18', 'active', 'VHL-3108-E'),
('DRV-109', 'Rian Maulana', 'SIM-2044-U', '+62-821-9900-7744', '2028-08-08', 'active', 'VHL-2044-U'),
('DRV-110', 'Lina Anggraini', 'SIM-5588-J', '+62-857-6633-1122', '2026-03-14', 'active', 'VHL-5588-J'),
('DRV-111', 'Gilang Ramadhan', 'SIM-9033-L', '+62-813-1199-5544', '2027-04-21', 'active', 'VHL-9033-L'),
('DRV-112', 'Maya Salsabila', 'SIM-4477-N', '+62-812-8866-2255', '2029-11-11', 'active', 'VHL-4477-N')
ON CONFLICT (id) DO NOTHING;

INSERT INTO fuel_logs (id, vehicle_id, refuel_date, liters, cost, odometer) VALUES
('FUEL-1001', 'VHL-4410-T', '2026-06-01', 120, 1440000, 186420),
('FUEL-1002', 'VHL-2044-U', '2026-05-31', 95, 1140000, 194883),
('FUEL-1003', 'VHL-3108-E', '2026-05-30', 140, 1680000, 168532),
('FUEL-1004', 'VHL-9904-A', '2026-05-29', 55, 660000, 66301),
('FUEL-1005', 'VHL-9033-L', '2026-05-28', 160, 1920000, 129010)
ON CONFLICT (id) DO NOTHING;

INSERT INTO maintenance_logs (id, vehicle_id, scheduled_date, status, notes, completed_date) VALUES
('MT-2001', 'VHL-4410-T', '2026-06-03', 'Scheduled', 'Oil change and brake inspection', NULL),
('MT-2002', 'VHL-2044-U', '2026-06-05', 'Scheduled', 'Filter replacement', NULL),
('MT-2003', 'VHL-5522-Y', '2026-05-28', 'Completed', 'Full service and tire balancing', '2026-05-28'),
('MT-2004', 'VHL-9033-L', '2026-06-10', 'Scheduled', 'Fuel injector check', NULL)
ON CONFLICT (id) DO NOTHING;
