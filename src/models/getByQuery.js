const collection = require("../database/collection");
const urlQueryContructor = require("../utils/urlQueryConstructor");
const getSortObj = require("../utils/getSortObj");
const getProjectionObj = require("../utils/getProjectionObj");

const getByQuery = async (query) => {
  const queryObject = urlQueryContructor(query);
  const sortObj = getSortObj(query.sort);

  try {
    let cursor = collection.find(queryObject).sort(sortObj);

    if (query.fields) {
      const projObj = getProjectionObj(query.fields);
      cursor = cursor.project(projObj);
    }

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
