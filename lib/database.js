import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connect() {
  if (!client.isConnected()) await client.connect();
  const db = client.db("TravelApp");
  return { db, client };
}
