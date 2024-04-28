import mysql2, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config()

let connection: Connection | null = null;

export const getConnection = async () => {
    if (connection) {
        return connection;
    }

    try {
        const dbHost = process.env.DB_HOST;
        const dbUser = process.env.DB_USER;
        const dbPassword = process.env.DB_PASSWORD;
        const dbName = process.env.DB_NAME;
        const dbPort: any = process.env.DB_PORT || 3306;
        
        connection = await mysql2.createConnection({
            host: dbHost,
            user: dbUser,
            port: dbPort,
            password: dbPassword,
            database: dbName,
        });
    } catch (error) {
        console.error("Failed to create MySQL connection:", error);
        throw error;
    }

    return connection;
};
