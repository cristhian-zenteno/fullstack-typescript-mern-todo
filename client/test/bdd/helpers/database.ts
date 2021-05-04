import mongoose, { NativeError } from "mongoose";

const MONGO_USER = "root";
const MONGO_PASSWORD = 123;

const uri: string = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@localhost:27017`;

export const dropDataBase = async () => {
  try {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    await db.dropCollection("todos", (err: NativeError) => {
      if (err) {
        console.error(err);
      } else {
        console.log("database cleaned");
      }
    });
  } catch (error) {
    console.error(error);
  }
};
