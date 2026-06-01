-- Run this script inside the fuelguard database after creating it.

CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  plate_number TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  driver_name TEXT,
  driver_phone TEXT,
  location TEXT,
  fuel_level NUMERIC(5,2) NOT NULL DEFAULT 0,
  fuel_capacity NUMERIC(8,2) NOT NULL DEFAULT 0,
  efficiency NUMERIC(5,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('moving', 'idle', 'offline')),
  last_updated TEXT,
  mileage INTEGER NOT NULL DEFAULT 0,
  next_service DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drivers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  license_number TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  license_expiry DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  assigned_vehicle_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_driver_assigned_vehicle
    FOREIGN KEY (assigned_vehicle_id)
    REFERENCES vehicles (id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS fuel_logs (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL,
  refuel_date DATE NOT NULL,
  liters NUMERIC(10,2) NOT NULL CHECK (liters > 0),
  cost NUMERIC(14,2) NOT NULL CHECK (cost >= 0),
  odometer INTEGER NOT NULL CHECK (odometer >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_fuel_logs_vehicle
    FOREIGN KEY (vehicle_id)
    REFERENCES vehicles (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_fuel_logs_vehicle_date ON fuel_logs (vehicle_id, refuel_date DESC);

CREATE TABLE IF NOT EXISTS maintenance_logs (
  id TEXT PRIMARY KEY,
  vehicle_id TEXT NOT NULL,
  scheduled_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'Completed')),
  notes TEXT,
  completed_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_maintenance_logs_vehicle
    FOREIGN KEY (vehicle_id)
    REFERENCES vehicles (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT chk_completed_date_consistency
    CHECK (
      (status = 'Completed' AND completed_date IS NOT NULL)
      OR (status = 'Scheduled' AND completed_date IS NULL)
    )
);

CREATE INDEX IF NOT EXISTS idx_maintenance_logs_status_date ON maintenance_logs (status, scheduled_date ASC);

CREATE OR REPLACE VIEW vw_driver_assignments AS
SELECT
  d.id AS driver_id,
  d.name AS driver_name,
  d.license_number,
  d.phone,
  d.license_expiry,
  d.status AS driver_status,
  d.assigned_vehicle_id,
  v.plate_number,
  v.type AS vehicle_type,
  v.status AS vehicle_status
FROM drivers d
LEFT JOIN vehicles v ON v.id = d.assigned_vehicle_id;

CREATE OR REPLACE VIEW vw_fuel_logs_enriched AS
SELECT
  f.id,
  f.refuel_date,
  f.vehicle_id,
  v.plate_number,
  v.type,
  v.driver_name,
  f.liters,
  f.cost,
  f.odometer,
  f.created_at,
  f.updated_at
FROM fuel_logs f
JOIN vehicles v ON v.id = f.vehicle_id;

CREATE OR REPLACE VIEW vw_upcoming_maintenance AS
SELECT
  m.id,
  m.vehicle_id,
  v.plate_number,
  m.scheduled_date,
  m.status,
  m.notes,
  m.completed_date
FROM maintenance_logs m
JOIN vehicles v ON v.id = m.vehicle_id
WHERE m.status = 'Scheduled';
