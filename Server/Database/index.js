import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const connectionString = 'postgresql://postgres:Password@2018@localhost:5432/bankaa';
const pool = new Pool({
  connectionString,
});
class Db {
  static async query(queryString, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryString, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default Db;
