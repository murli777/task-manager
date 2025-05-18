const { client } = require("../database/mongoConnect");
const queryContructor = require("../utils/queryContructor");

const update = async (query, data) => {
  const filter = queryContructor(query);

  const update = {
    $set: data,
  };

  try {
    const collection = client.db("Test").collection("People");

    const result = await collection.updateOne(filter, update);
    return ({ acknowledged, matchedCount, modifiedCount } = result);
  } catch (error) {
    console.log("Error occured while modifying:", error);

    throw error;
  }
};

module.exports = update;
