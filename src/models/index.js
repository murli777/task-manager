const getAll = require("./getAll");
const getById = require("./getById");
const getByQuery = require("./getTaskByQuery");
const insertOne = require("./insertOne");
const updateByQuery = require("./updateByQuery");
const updateById = require("./updateById");
const deleteById = require("./deleteById");

module.exports = {
  getAll,
  getById,
  getByQuery,
  insertOne,
  updateByQuery,
  updateById,
  deleteById,
};
