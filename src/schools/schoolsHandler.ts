import { Connection } from "mysql2/promise";

export const fetchSchools = async (connection: Connection) => {
  try {
    const [rows] = await connection.execute("SELECT * FROM sekolah");

    return rows;
  } catch (error) {
    console.log("Error: ", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
