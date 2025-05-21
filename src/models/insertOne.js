const collection = require("../database/collection");

const insertOne = async (document) => {
  try {
    const insertResult = await collection.insertOne(document);
    return insertResult;
  } catch (error) {
    console.error("Error inserting document:", error);
    throw error;
  }
};

module.exports = insertOne;
