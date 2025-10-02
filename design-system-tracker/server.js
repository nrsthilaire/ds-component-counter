import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key !== process.env.TRACKER_API_KEY) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});

app.get('/', (req, res) => res.send('✅ Design System Tracker API running'));

app.post('/ds-usage', async (req, res) => {
  const { component, route, hostname, appVersion, environment, timestamp } = req.body;
  if (!component) return res.status(400).json({ error: 'Component is required' });

  try {
    await pool.query(
      `INSERT INTO ds_usage (component, route, hostname, app_version, environment, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [component, route, hostname, appVersion, environment || 'production', timestamp || new Date()]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.error('DB insert error', err);
    res.status(500).json({ error: 'DB insert failed' });
  }
});

app.get('/ds-usage/summary', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        component,
        COUNT(*) AS total_usage,
        COUNT(DISTINCT route) AS unique_routes,
        COUNT(DISTINCT hostname) AS unique_apps,
        MAX(timestamp) AS last_used
      FROM ds_usage
      GROUP BY component
      ORDER BY total_usage DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Summary error', err);
    res.status(500).json({ error: 'Failed to load summary' });
  }
});

app.get('/ds-usage/trends', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT component, DATE(timestamp) AS date, COUNT(*) AS usage
      FROM ds_usage
      GROUP BY component, DATE(timestamp)
      ORDER BY date DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Trend error', err);
    res.status(500).json({ error: 'Failed to load trends' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`🚀 DS Tracker API listening on port ${port}`));
