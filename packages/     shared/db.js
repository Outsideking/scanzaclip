// packages/shared/db.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/scanzaclip";
const client = new MongoClient(uri);

export async function saveToDatabase(collectionName, data) {
  try {
    await client.connect();
    const db = client.db("scanzaclip");
    const collection = db.collection(collectionName);
    await collection.insertOne(data);
  } catch (err) {
    console.error("DB error:", err);
  }
}
