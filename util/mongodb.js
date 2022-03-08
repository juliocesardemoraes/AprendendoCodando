import mongoose from "mongoose";
import { MONGO_URI } from "../config/enviromentVariables";

let connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  connection = mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      return connection;
    })
    .catch((err) => console.log("ERROR CONNECTING TO DB!---> ", err));
  
}
export default dbConnect;
