const collection = require("../database/collection");
const { ObjectId } = require("mongodb");

const deleteById = async (id) => {
  try {
    const result = await collection.findOneAndDelete({
      _id: ObjectId.createFromHexString(id),
    });

    return result;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

module.exports = deleteById;
