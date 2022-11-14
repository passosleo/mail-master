import mysql from "mysql2/promise";
import config from "../config/config.dev";

async function query(sql: string) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [rows, fields] = await connection.execute(sql);
    return { rows, fields };
  } catch (err) {
    throw new Error("Failed to execute query. Error: " + err);
  }
}

export default query;
