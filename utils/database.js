import mongoose from "mongoose";

let isconnected = false;
export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (isconnected) {
    console.log("connected_to_database successfully");
  }
  //lets connect to database incase
  //its not connected
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "nextjsapp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isconnected = true;
  } catch (error) {
    console.log(error);
  }
};
