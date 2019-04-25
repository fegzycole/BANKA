import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
});
class Db {
  static async query(queryString, params) {
    try {
      const resolvedPromise = await pool.query(queryString, params);
      return resolvedPromise;
    } catch (error) {
      return error;
    }
  }
}

export default Db;
