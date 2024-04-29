import { Connection } from "mysql2/promise";

export const fetchUsers = async (connection: Connection) => {
  try {
    const [rows] = await connection.execute("SELECT name, email FROM users");

    return rows;
  } catch (error) {
    console.log("Error: ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
