const collection = require("../database/collection");
const { ObjectId } = require("mongodb");

const updateById = async (id, data) => {
  try {
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data },
      { returnDocument: "after" }
    );

    return result;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

module.exports = updateById;
