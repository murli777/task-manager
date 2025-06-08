const urlQueryContructor = (query) => {
  const { name, completed } = query;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (completed !== undefined) {
    queryObject.completed = completed === "true" ? true : false;
  }

  return queryObject;
};

module.exports = urlQueryContructor;
