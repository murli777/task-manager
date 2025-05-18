const { MongoClient } = require("mongodb");
require("dotenv").config();
const mongoString = process.env.LOCAL_MONGO_CONNECTION_STRING;

const client = new MongoClient(mongoString);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  client,
};
