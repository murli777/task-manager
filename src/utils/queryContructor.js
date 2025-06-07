/**
 * Converts nested query objects into MongoDB dot notation format while preserving MongoDB operators
 * @param {Object} query - The query object to convert
 * @returns {Object} Converted query with dot notation for nested fields and preserved MongoDB operators
 *
 * @example
 * // Simple nested object
 * queryConstructor({ name: { first: 'John' } })
 * // Returns: { 'name.first': 'John' }
 *
 * @example
 * // With MongoDB operator
 * queryConstructor({ age: { $gte: 25 } })
 * // Returns: { age: { $gte: 25 } }
 *
 * @example
 * // Multiple MongoDB operators
 * queryConstructor({ price: { $ne: 1.99, $exists: true } })
 * // Returns: { price: { $ne: 1.99, $exists: true } }
 *
 * @example
 * // Nested fields with MongoDB operator
 * queryConstructor({ address: { city: { $in: ['NYC', 'LA'] } } })
 * // Returns: { 'address.city': { $in: ['NYC', 'LA'] } }
 */
const queryContructor = (query) => {
  // If no query provided, return empty object
  if (!query) return {};

  const result = {};

  /**
   * Recursively processes an object to create dot notation paths
   * @param {Object} obj - The object to process
   * @param {string} parentPath - The parent path in dot notation
   */
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
        const convertToNumber = Number(value);

        isNaN(convertToNumber)
          ? (result[currentPath] = value)
          : (result[currentPath] = convertToNumber);

        if (value === "true" || value === "false") {
          result[currentPath] = Boolean(value);
        } else {
          result[currentPath] = value;
        }
      }
    }
  };

  // Start processing from the top level
  processObject(query);

  return result;
};

module.exports = queryContructor;
