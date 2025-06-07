const collection = require("../database/collection");
const urlQueryContructor = require("../utils/urlQueryConstructor");

const getByQuery = async (query) => {
  const queryObject = urlQueryContructor(query);
  const sortObj = {};

  try {
    let cursor;

    if (query.sort) {
      if (query.sort[0] !== "-") {
        const value = query.sort;
        sortObj[value] = 1;
      } else {
        const value = query.sort.slice(1);
        sortObj[value] = -1;
      }
    }

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
