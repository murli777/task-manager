const {
  // getAll,
  getById,
  getByQuery,
  insertOne,
  updateByQuery,
  updateById,
  deleteById,
} = require("../models");

const asyncWrapper = require("../middlewares/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

// Replaced by getTasks.

// const getAllTasks = asyncWrapper(async (req, res, next) => {
//   const result = await getAll();

//   if (Array.isArray(result) && !result.length) {
//     return next(createCustomError("No tasks found.", 404));
//   }
//   return res.status(200).json({ success: true, response: result });
// });

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const result = await getById(id);

  if (!result) {
    return next(createCustomError("No task with ID.", 404));
  }
  return res.status(200).json({ success: true, response: result });
});

// Get all tasks if no search parameters provided

const getTasks = asyncWrapper(async (req, res, next) => {
  let queryObj = {};

  if (req.query) {
    queryObj = req.query;
  }

  if (req.body) {
    queryObj = req.body;
  }

  const result = await getByQuery(queryObj);

  if (Array.isArray(result) && !result.length) {
    return next(createCustomError("No tasks match with search criteria.", 404));
  }
  return res.status(200).json({ success: true, response: result });
});

const createTask = asyncWrapper(async (req, res, next) => {
  const body = req.body;

  if (!body || Object.keys(body).length === 0) {
    return next(createCustomError("No task data provided.", 400));
  }

  const result = await insertOne(body);
  return res.status(201).json({ success: true, response: result });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { query, data } = req.body;

  if (!query || Object.keys(query).length === 0) {
    return next(createCustomError("No search criteria provided.", 400));
  }

  if (!data || Object.keys(data).length === 0) {
    return next(
      createCustomError(
        "No update data provided. Please specify the changes you want to make to the document(s).",
        400
      )
    );
  }

  const result = await updateByQuery(query, data);
  return res.status(200).json({ success: true, response: result });
});

const updateTaskById = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return next(
      createCustomError(
        "No update data provided. Please specify the changes you want to make to the document(s).",
        400
      )
    );
  }

  const result = await updateById(id, data);
  if (!result) {
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).json({ success: true, response: result });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const result = await deleteById(id);

  if (!result) {
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).json({
    success: true,
    response: {
      message: "Task deleted successfully",
      deletedTask: result,
    },
  });
});

module.exports = {
  createTask,
  getTaskById,
  getTasks,
  updateTask,
  updateTaskById,
  deleteTask,
};
