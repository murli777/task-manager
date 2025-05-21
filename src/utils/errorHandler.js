/**
 * Handles errors in controllers by logging them and sending appropriate response
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 * @param {string} errorId - The error identifier
 * @param {string} userMessage - Message to show to the user
 */
const handleError = (error, res, errorId, userMessage) => {
  const timestamp = new Date().toISOString();

  // Log error details for debugging
  console.error({
    errorId,
    message: error.message,
    stack: error.stack,
    timestamp,
  });

  // Send clean response to user
  return res.status(500).json({
    success: false,
    response: userMessage,
    errorId,
  });
};

module.exports = handleError;
