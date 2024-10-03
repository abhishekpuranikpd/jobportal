import { MongoClient } from "mongodb";

let client;
let clientPromise;

// Create a function to connect to MongoDB
export const connectToDatabase = async () => {
  if (client) {
    return { db: client.db() };
  }
  
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return { db: client.db() };
};
