import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "PORTFOLIO",
    })
    .then(() => {
      console.log("connected to databse");
    })
    .catch((error) => {
      console.log("some error while connecting to database");
      console.log(error);
    });
};

export default dbConnection;
