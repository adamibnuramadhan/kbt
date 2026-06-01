import express from 'express'
import cors from 'cors'
import pool from './db.js'

const app = express()

app.use(cors())
app.use(express.json())

function toNumber(value) {
	if (value === '' || value === null || value === undefined) return null
	return Number(value)
}

function pickDefined(source) {
	return Object.fromEntries(Object.entries(source).filter(([, value]) => value !== undefined))
}

function createCrudRouter({ table, orderBy = 'created_at DESC', toDb, fromDb, requiredFields = [], generateId }) {
	const router = express.Router()

	router.get('/', async (_req, res) => {
		try {
			const result = await pool.query(`SELECT * FROM ${table} ORDER BY ${orderBy}`)
			res.json(result.rows.map(fromDb))
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})

	router.get('/:id', async (req, res) => {
		try {
			const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [req.params.id])
			if (result.rowCount === 0) return res.status(404).json({ message: 'Record not found' })
			res.json(fromDb(result.rows[0]))
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})

	router.post('/', async (req, res) => {
		try {
			const payload = pickDefined(toDb(req.body))
			if (!payload.id && generateId) {
				payload.id = generateId()
			}
			const missing = requiredFields.filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '')
			if (missing.length > 0) return res.status(400).json({ message: `Missing required fields: ${missing.join(', ')}` })

			const keys = Object.keys(payload)
			const values = Object.values(payload)
			const placeholders = keys.map((_, index) => `$${index + 1}`)
			const result = await pool.query(
				`INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
				values,
			)
			res.status(201).json(fromDb(result.rows[0]))
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})

	router.put('/:id', async (req, res) => {
		try {
			const payload = pickDefined(toDb(req.body))
			const keys = Object.keys(payload)
			if (keys.length === 0) return res.status(400).json({ message: 'No fields to update' })

			const assignments = keys.map((key, index) => `${key} = $${index + 1}`)
			const values = [...Object.values(payload), req.params.id]
			const result = await pool.query(
				`UPDATE ${table} SET ${assignments.join(', ')}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
				values,
			)
			if (result.rowCount === 0) return res.status(404).json({ message: 'Record not found' })
			res.json(fromDb(result.rows[0]))
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})

	router.delete('/:id', async (req, res) => {
		try {
			const result = await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING id`, [req.params.id])
			if (result.rowCount === 0) return res.status(404).json({ message: 'Record not found' })
			res.status(204).send()
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	})

	return router
}

const vehicleRouter = createCrudRouter({
	table: 'vehicles',
	orderBy: 'created_at DESC',
	requiredFields: ['plate_number', 'type'],
	generateId: () => `VHL-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
	toDb: (body) => ({
		id: body.id,
		plate_number: body.plateNumber,
		type: body.type,
		driver_name: body.driver,
		driver_phone: body.driverPhone,
		location: body.location,
		fuel_level: body.fuelLevel === undefined ? undefined : toNumber(body.fuelLevel),
		fuel_capacity: body.fuelCapacity === undefined ? undefined : toNumber(body.fuelCapacity),
		efficiency: body.efficiency === undefined ? undefined : toNumber(body.efficiency),
		status: body.status,
		last_updated: body.lastUpdated,
		mileage: body.mileage === undefined ? undefined : toNumber(body.mileage),
		next_service: body.nextService || null,
	}),
	fromDb: (row) => ({
		id: row.id,
		plateNumber: row.plate_number,
		type: row.type,
		driver: row.driver_name,
		driverPhone: row.driver_phone,
		location: row.location,
		fuelLevel: Number(row.fuel_level),
		fuelCapacity: Number(row.fuel_capacity),
		efficiency: Number(row.efficiency),
		status: row.status,
		lastUpdated: row.last_updated,
		mileage: row.mileage,
		nextService: row.next_service,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	}),
})

const driverRouter = createCrudRouter({
	table: 'drivers',
	orderBy: 'created_at DESC',
	requiredFields: ['name', 'license_number', 'phone', 'license_expiry'],
	generateId: () => `DRV-${Math.floor(100 + Math.random() * 900)}`,
	toDb: (body) => ({
		id: body.id,
		name: body.name,
		license_number: body.licenseNumber,
		phone: body.phone,
		license_expiry: body.licenseExpiry || null,
		status: body.status || 'active',
		assigned_vehicle_id: body.assignedVehicleId || null,
	}),
	fromDb: (row) => ({
		id: row.id,
		name: row.name,
		licenseNumber: row.license_number,
		phone: row.phone,
		licenseExpiry: row.license_expiry,
		status: row.status,
		assignedVehicleId: row.assigned_vehicle_id,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	}),
})

const fuelLogRouter = createCrudRouter({
	table: 'fuel_logs',
	orderBy: 'refuel_date DESC, created_at DESC',
	requiredFields: ['vehicle_id', 'refuel_date', 'liters', 'cost', 'odometer'],
	generateId: () => `FUEL-${Math.floor(1000 + Math.random() * 9000)}`,
	toDb: (body) => ({
		id: body.id,
		vehicle_id: body.vehicleId,
		refuel_date: body.date || body.refuelDate,
		liters: body.liters === undefined ? undefined : toNumber(body.liters),
		cost: body.cost === undefined ? undefined : toNumber(body.cost),
		odometer: body.odometer === undefined ? undefined : toNumber(body.odometer),
	}),
	fromDb: (row) => ({
		id: row.id,
		date: row.refuel_date,
		vehicleId: row.vehicle_id,
		liters: Number(row.liters),
		cost: Number(row.cost),
		odometer: row.odometer,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	}),
})

const maintenanceRouter = createCrudRouter({
	table: 'maintenance_logs',
	orderBy: 'scheduled_date ASC, created_at DESC',
	requiredFields: ['vehicle_id', 'scheduled_date'],
	generateId: () => `MT-${Math.floor(1000 + Math.random() * 9000)}`,
	toDb: (body) => ({
		id: body.id,
		vehicle_id: body.vehicleId,
		scheduled_date: body.scheduledDate,
		status: body.status || 'Scheduled',
		notes: body.notes || null,
		completed_date: body.completedDate || null,
	}),
	fromDb: (row) => ({
		id: row.id,
		vehicleId: row.vehicle_id,
		scheduledDate: row.scheduled_date,
		status: row.status,
		notes: row.notes,
		completedDate: row.completed_date,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	}),
})

app.get('/api/health', async (_req, res) => {
	try {
		await pool.query('SELECT 1')
		res.json({ ok: true })
	} catch (error) {
		res.status(500).json({ ok: false, message: error.message })
	}
})

app.use('/api/vehicles', vehicleRouter)
app.use('/api/drivers', driverRouter)
app.use('/api/fuel-logs', fuelLogRouter)
app.use('/api/maintenance-logs', maintenanceRouter)

app.use((error, _req, res, _next) => {
	res.status(500).json({ message: error.message })
})

export default app