const app = require('./app')
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const {DB_HOST} = process.env;


const serverHost = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Database connection successful");


    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000")
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}


serverHost();






