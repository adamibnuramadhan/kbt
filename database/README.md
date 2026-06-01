# PostgreSQL Setup

Run the files in this order from pgAdmin:

1. `01_create_database.sql`
2. Connect to the new `kbt` database
3. `02_schema.sql`
4. `03_seed.sql`

The schema includes:

- `vehicles`
- `drivers`
- `fuel_logs`
- `maintenance_logs`
- Helper views for reports and assignments
