import mongoose from "mongoose";
import { MongoConnection } from "./types";

const connection: MongoConnection = {};

async function connect() {
  if (connection.isConnected) {
    console.log("MongoDB already connected.");
    return;
  }

  try {
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;

      // Use the previous connection if connected already
      if (connection.isConnected === 1) {
        console.log("Using previous connection");
        return;
      }

      await mongoose.disconnect(); // Disconnect any ongoing connections
    }

    // Make a new connection to DB
    mongoose
      .connect(process.env.MONGO_URI!)
      .then((con) => {
        console.log("Connected to DB (new connection).");
        connection.isConnected = con.connections[0].readyState;
      })
      .catch((err) => {
        console.log("MongoDB connection err: ", err);
      });
  } catch (err) {
    console.log("Error connecting to DB: ", err);
  }
}

async function disconnect() {
  if (connection.isConnected === 0) {
    console.log("Not connected to DB");
    return;
  }

  try {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = 0;
    } else {
      // Keep the connection alive in dev mode
      console.log("Not disconnected");
    }
  } catch (err) {
    console.log("Error disconnecting the MongoDB");
  }
}

export default {
  connect,
  disconnect,
};
