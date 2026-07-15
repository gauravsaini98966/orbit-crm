import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/orbit_crm";
  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log(`[db] connected -> ${mongoose.connection.name}`);
  } catch (err) {
    console.error("[db] connection failed:", err.message);
    console.error("[db] the API will still run, but /api/inquiry endpoints will return 503 until MongoDB is reachable");
  }

  mongoose.connection.on("disconnected", () => {
    isConnected = false;
  });
  mongoose.connection.on("connected", () => {
    isConnected = true;
  });
}

export function isDBConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}
