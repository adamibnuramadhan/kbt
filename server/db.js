/* global process */
import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config({ path: '.env.local' })
dotenv.config()

const { Pool } = pg

const pool = new Pool(
	process.env.DATABASE_URL
		? {
			connectionString: process.env.DATABASE_URL,
		}
		: {
			host: process.env.DB_HOST || '127.0.0.1',
			port: Number(process.env.DB_PORT || 5432),
			database: process.env.DB_NAME || 'kbt',
			user: process.env.DB_USER || 'kbt',
			password: process.env.DB_PASSWORD || '',
		},
)

export default pool