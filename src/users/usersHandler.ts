import { Connection } from "mysql2/promise";

export const getUsers = async (connection: Connection) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM USERS");

    return rows;
  } catch (error) {
    console.log("Error: ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
