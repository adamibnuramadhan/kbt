import app from '../server/app.js';

// Vercel serverless functions expect a `(req, res)` handler.
// `app` is an Express application and can be invoked directly.
export default function handler(req, res) {
	return app(req, res)
}
