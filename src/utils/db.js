const mongoose = require("mongoose");

const LINK_DB = process.env.DB_URL;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(LINK_DB);
    const { host } = db.connection;
    console.log("Successfully connecting to the host: " + host);
  } catch (error) {
    console.log("I can't connect to the database, check this error -> ", error);
  }
};

module.exports = { connectDB };
