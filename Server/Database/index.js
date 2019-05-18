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
      const data = await pool.query(queryString, params);
      return data;
    } catch (error) {
      return error;
    }
  }
}

export default Db;
