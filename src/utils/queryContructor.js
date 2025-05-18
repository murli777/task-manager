/**
 * Converts nested query objects into MongoDB dot notation format while preserving MongoDB operators
 * Examples:
 * { name: { first: 'John' } } becomes { 'name.first': 'John' }
 * { age: { $gte: 25 } } stays as { age: { $gte: 25 } }
 * { price: { $ne: 1.99, $exists: true } } stays as { price: { $ne: 1.99, $exists: true } }
 * { address: { city: { $in: ['NYC', 'LA'] } } } becomes { 'address.city': { $in: ['NYC', 'LA'] } }
 */
const queryContructor = (query) => {
  // If no query provided, return empty object
  if (!query) return {};

  const result = {};

  const processObject = (obj, parentPath = "") => {
    for (const key in obj) {
      const value = obj[key];
      // Create the full path (e.g., "name.first" or just "age")
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      if (value && typeof value === "object") {
        // Special case: if the value contains MongoDB operator (like $gte), keep the whole object
        if (Object.keys(value).some((k) => k.startsWith("$"))) {
          result[currentPath] = value;
        } else {
          processObject(value, currentPath);
        }
      } else {
        result[currentPath] = value;
      }
    }
  };

  // Start processing from the top level
  processObject(query);

  return result;
};

module.exports = queryContructor;
