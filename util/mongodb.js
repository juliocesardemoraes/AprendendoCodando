import mongoose from "mongoose";
import { MONGO_URI } from "../config/enviromentVariables";

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
    .then((res) => {
      console.log("Connected----->", res);
    })
    .catch((err) => console.log("ERROR!---> ", err));
}
export default dbConnect;
