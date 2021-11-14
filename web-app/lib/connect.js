import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    try {
      cached.promise = mongoose.connect(MONGO_URI, opts);
      cached.conn = await cached.promise;
    } catch (error) {
      console.log("Error in connecting to db: " + error);
    }
  }
  return cached.conn;
}

export default dbConnect;
