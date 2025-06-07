const urlQueryContructor = (query) => {
  const { name, company, featured } = query;

  const queryObject = {};

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  return queryObject;
};

module.exports = urlQueryContructor;
