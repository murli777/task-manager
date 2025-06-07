const getProjectionObj = (projStr) => {
  const fieldsArr = projStr.split(",");

  return fieldsArr.reduce((acc, field) => {
    const value = field.startsWith("-") ? 0 : 1;
    const key = field.startsWith("-") ? field.slice(1) : field;
    acc[key] = value;
    return acc;
  }, {});
};

module.exports = getProjectionObj;
