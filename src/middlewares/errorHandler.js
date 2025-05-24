/**
 * Handles errors in controllers by logging them and sending appropriate response
 * @param {Error} error - The error object
 * @param {Response} res - Express response object
 * @param {string} errorId - The error identifier
 * @param {string} userMessage - Message to show to the user
 */

const { CustomAPIError } = require("../errors/custom-error");
const errorHandler = (error, req, res, next) => {
  const timestamp = new Date().toISOString();

  if (error instanceof CustomAPIError) {
    console.error({
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    // Send clean response to user
    return res.status(error.statusCode).json({
      success: false,
      response: error.message,
    });
  }

  return res.status(500).json({
    success: false,
    response: "Something went wrong. Please try again later.",
  });

  // Log error details for debugging
};

module.exports = errorHandler;
