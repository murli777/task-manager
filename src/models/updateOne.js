const collection = require("../database/collection");
const queryContructor = require("../utils/queryContructor");

const update = async (query, data) => {
  const filter = queryContructor(query);

  const update = {
    $set: data,
  };

  try {
    const result = await collection.updateOne(filter, update);
    return ({ acknowledged, matchedCount, modifiedCount } = result);
  } catch (error) {
    console.log("Error occured while modifying:", error);

    throw error;
  }
};

module.exports = update;
