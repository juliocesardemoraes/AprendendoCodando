import mongoose from "mongoose";

const connection = {};

async function dbDisconnect() {
  if (connection.isConnected) {
    await mongoose.close();
    return;
  }
}

export default dbDisconnect;
