const collection = require("../database/collection");

const getAll = async () => {
  try {
    const cursor = collection.find();
    const documents = [];

    for await (const doc of cursor) {
      documents.push(doc);
    }

    return documents;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

module.exports = getAll;
