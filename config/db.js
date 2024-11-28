require("dotenv").config();
const mongoose = require("mongoose");

const myId = process.env.MONGO_USER;
const myPassword = process.env.MONGO_PASSWORD;

const connectDB  = async () => {
  const mongoURI = `mongodb+srv://${myId}:${myPassword}@cluster0.teyrc.mongodb.net/`;
  try {
    await mongoose.connect(mongoURI, {
      dbName: "TodoList"
    });
  } catch(err){
    console.log('에러 발생 : ', err);
  }
}


module.exports = connectDB;