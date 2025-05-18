const { client } = require("../database/mongoConnect");

const insertOne = async (document) => {
  try {
    const collection = client.db("Test").collection("People");
    const insertResult = await collection.insertOne(document);
    return insertResult;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
};

module.exports = insertOne;
