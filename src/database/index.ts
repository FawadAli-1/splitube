import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const cached = global.mongoose || { conn: null, promise: null };

export const connectToDb = async () => {
  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing...");

  if (cached.conn) return cached.conn;

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "SplitTubeYT",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
