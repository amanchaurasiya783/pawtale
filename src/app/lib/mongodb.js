import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("Error: Please define the MONGODB_URI environment variable.");
  console.log("environment variables : ", process.env);

  throw new Error(
    "MONGODB_URI is not defined in .env.local or environment settings."
  );
}

// Connect to the MongoDB database and return the database instance.
const connectToDatabase = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.db;
    }
    const connectedClient = await mongoose.connect(uri);
    console.log("Database Connected!");
    return connectedClient.connection.db; // Return the database instance
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export default connectToDatabase;
