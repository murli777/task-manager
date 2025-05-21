const getAll = require("../models/getAll");
const getById = require("../models/getById");
const getByQuery = require("../models/getTaskByQuery");
const insertOne = require("../models/insertOne");
const update = require("../models/updateOne");
const handleError = require("../utils/errorHandler");

const getAllTasks = async (req, res) => {
  try {
    const result = await getAll();

    if (Array.isArray(result) && !result.length) {
      return res.status(404).json({
        success: false,
        response: "No results found",
        errorId: "TASK-GET-ALL-NOTFOUND",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(
      error,
      res,
      "TASK-GET-ALL-DBERROR",
      "Something went wrong while getting tasks..."
    );
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await getById(id);
    if (!result) {
      return res.status(404).json({
        success: false,
        response: "Task not found",
        errorId: "TASK-GET-BYID-NOTFOUND",
      });
    }
    res.status(200).json({ success: true, response: result });
  } catch (error) {
    return handleError(
      error,
      res,
      "TASK-GET-BYID-DBERROR",
      "Something went wrong while getting tasks..."
    );
  }
};

const getTaskByQuery = async (req, res) => {
  const query = req.body.query;

  try {
    const result = await getByQuery(query);
    if (Array.isArray(result) && !result.length) {
      return res.status(404).json({
        success: false,
        response: "No results found",
        errorId: "TASK-GET-QUERY-NOTFOUND",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return handleError(
      error,
      res,
      "TASK-GET-QUERY-DBERROR",
      "Something went wrong while getting tasks..."
    );
  }
};

const createTask = async (req, res) => {
  const body = req.body;

  try {
    const result = await insertOne(body);
    return res.status(201).json({ success: true, response: result });
  } catch (error) {
    return handleError(
      error,
      res,
      "TASK-CREATE-DBERROR",
      "Something went wrong while inserting data..."
    );
  }
};

const updateTask = async (req, res) => {
  const { query, data } = req.body;

  if (!query || Object.keys(query).length === 0) {
    return res.status(400).json({
      success: false,
      response: "No search criteria provided.",
      errorId: "TASK-UPDATE-NOQUERY",
    });
  }

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      response:
        "No update data provided. Please specify the changes you want to make to the document(s).",
      errorId: "TASK-UPDATE-NODATA",
    });
  }

  try {
    const result = await update(query, data);
    return res.status(200).json({ success: true, response: result });
  } catch (error) {
    return handleError(
      error,
      res,
      "TASK-UPDATE-DBERROR",
      "Something went wrong while updating data..."
    );
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  res.send(`Delete task with ID ${id}`);
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  getTaskByQuery,
  updateTask,
  deleteTask,
};
