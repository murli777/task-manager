const { client } = require("../database/mongoConnect");

// const databaseName = "Tasks";
// const collectionName = "tasks";

const databaseName = "products";
const collectionName = "productList";

const collection = client.db(databaseName).collection(collectionName);

module.exports = collection;
