const { client } = require("../database/mongoConnect");
const { ObjectId } = require("mongodb");

const getById = async (id) => {
  try {
    const documentId = ObjectId.createFromHexString(id);
    const query = { _id: documentId };

    const collection = client.db("Test").collection("People");

    const data = await collection.findOne(query);
    return data;
  } catch (error) {
    console.error("Error getting document:", error);
    throw error;
  }
};

module.exports = getById;
