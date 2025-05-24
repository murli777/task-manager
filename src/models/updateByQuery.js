const collection = require("../database/collection");
const queryContructor = require("../utils/queryContructor");

const updateByQuery = async (query, data) => {
  const filter = queryContructor(query);

  try {
    const result = await collection.findOneAndUpdate(
      filter,
      { $set: data },
      { returnDocument: "after" }
    );

    return result;
  } catch (error) {
    console.log("Error occurred while modifying:", error);
    throw error;
  }
};

module.exports = updateByQuery;
