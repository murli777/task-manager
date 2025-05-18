const { client } = require("../database/mongoConnect");
const queryContructor = require("../utils/queryContructor");

const getByQuery = async (query) => {
  const queryObject = queryContructor(query);

  try {
    const collection = client.db("Test").collection("People");

    const cursor = collection.find(queryObject);

    const documents = [];

    for await (const doc of cursor) {
      documents.push(doc);
    }

    return documents;
  } catch (error) {
    console.error("Error while getting document:", error);
    throw error;
  }
};

module.exports = getByQuery;
