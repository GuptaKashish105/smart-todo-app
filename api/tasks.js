import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "todo"; // database name
const collectionName = "tasks"; // collection name

async function getDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  const db = client.db(dbName);
  return db.collection(collectionName);
}

export default async function handler(req, res) {
  const collection = await getDb();

  if (req.method === "GET") {
    const tasks = await collection.find({}).toArray();
    return res.status(200).json(tasks);
  }

  if (req.method === "POST") {
    const { title, description, deadline } = req.body;
    const newTask = {
      title,
      description,
      deadline,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = await collection.insertOne(newTask);
    return res.status(201).json({ ...newTask, _id: result.insertedId });
  }

  if (req.method === "PUT") {
    const { id, ...updates } = req.body;

    if (!id || !ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Missing or invalid task ID" });
    }

    updates.updatedAt = new Date().toISOString();

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });
    const updated = await collection.findOne({ _id: new ObjectId(id) });

    return res.status(200).json(updated);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    await collection.deleteOne({ _id: new ObjectId(id) });
    return res.status(204).end();
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
