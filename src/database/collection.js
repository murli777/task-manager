const { client } = require("../database/mongoConnect");

const databaseName = "Test";
const collectionName = "People";

const collection = client.db(databaseName).collection(collectionName);

module.exports = collection;
