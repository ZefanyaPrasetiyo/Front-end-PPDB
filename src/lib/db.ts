import mysql from "mysql2/promise";

let pool: any = null;

export function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "db_ujiLevel",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
