import mongoose from "mongoose";

interface ConnectionObject {
    isConnect?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnect) {
        console.log("Database is already connected");
        return;
    }

    try {
        const mongoUri = process.env.MONGODB_URI;

        console.log("mongo url: ",mongoUri);
        
        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is not set. Please check your .env.local file.");
        }

        console.log("Connecting to MongoDB...");
        const db = await mongoose.connect(mongoUri);

        console.log("collection name :",db.connection.db?.databaseName);

        connection.isConnect = db.connections[0].readyState;
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        throw error;
    }
}

export default dbConnect