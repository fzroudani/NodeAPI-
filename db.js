const mongoose = require("mongoose");
const URL = "mongodb+srv://fzroud:fzroud123@nodeapi.p5jxztn.mongodb.net/MERN";
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(URL).then(() => {
      console.log("Connected to MongoDb seccesfully");
    });
  } catch (error) {
    console.log(`could not connect to db ${error}`);
  }
};
module.exports = connectDB;
