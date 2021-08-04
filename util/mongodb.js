import mongoose from "mongoose";
import { MONGO_URI } from "../config/enviromentVariables";

console.log("MONGOURI----->", MONGO_URI);
console.log("PROCESS>ENV--->", process.env.MONGODB_URI);

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {})
    .catch((err) => console.log("ERROR!---> ", err));
}
export default dbConnect;
