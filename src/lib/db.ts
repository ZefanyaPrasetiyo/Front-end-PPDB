import mysql from "mysql2/promise";

let connection: any = null;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "db_ujiLevel",
    });
  }

  return connection;
}
