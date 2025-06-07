const collection = require("../database/collection");
const urlQueryContructor = require("../utils/urlQueryConstructor");
const getSortObj = require("../utils/getSortObj");

const getByQuery = async (query) => {
  const queryObject = urlQueryContructor(query);
  const sortObj = getSortObj(query.sort);

  try {
    let cursor;

    if (sortObj) {
      cursor = collection.find(queryObject).sort(sortObj);
    } else {
      cursor = collection.find(queryObject);
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
