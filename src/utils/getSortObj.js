const getSortObj = (sortStr) => {
  if (!sortStr) return { name: 1 };

  const sortArr = sortStr.split(",");

  return sortArr.reduce((obj, field) => {
    const sortValue = field.startsWith("-") ? -1 : 1;
    const key = field.startsWith("-") ? field.slice(1) : field;

    obj[key] = sortValue;
    return obj;
  }, {});
};

module.exports = getSortObj;
