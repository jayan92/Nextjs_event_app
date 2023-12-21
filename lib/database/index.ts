// Import the mongoose library
import mongoose from "mongoose";

// Get the MongoDB URI from the environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Create a global variable to cache the database connection
let cached = (global as any).mongoose || { conn: null, promise: null };

// Define a function to connect to the MongoDB database
export const connectToDatabase = async () => {
  // If a connection already exists, return it immediately
  if (cached.conn) return cached.conn;

  // Throw an error if the MongoDB URI is not provided
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  // If no connection exists, create a promise to connect to the database
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      // Specify the database name
      dbName: "evently",
      // Disable buffering of commands, allowing for more control over when to execute commands
      bufferCommands: false,
    });

  // Await the resolution of the connection promise
  cached.conn = await cached.promise;

  // Return the connected database connection
  return cached.conn;
};
