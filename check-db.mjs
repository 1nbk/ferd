import { config } from 'dotenv';
config({ path: '.env.local' });

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

try {
  const res = await pool.query('SELECT id, name FROM "Room" LIMIT 10');
  console.log('Rooms in DB:', JSON.stringify(res.rows, null, 2));
  
  const res2 = await pool.query("SELECT id, name FROM \"Room\" WHERE id = 'luxury-penthouse-1'");
  console.log('Penthouse found:', JSON.stringify(res2.rows, null, 2));
} catch (e) {
  console.error('DB Error:', e.message);
} finally {
  await pool.end();
}
