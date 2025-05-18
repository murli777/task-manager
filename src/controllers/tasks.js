const getAll = require("../models/getAll");
const getById = require("../models/getById");
const getByQuery = require("../models/getTaskByQuery");
const insertOne = require("../models/insertOne");
const update = require("../models/updateOne");

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
    const timestamp = new Date().toISOString();
    console.error({
      errorId: "TASK-GET-ALL-DBERROR",
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    return res.status(500).json({
      success: false,
      response: "Something went wrong while getting tasks...",
      errorId: "TASK-GET-ALL-DBERROR",
    });
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
    const timestamp = new Date().toISOString();
    console.error({
      errorId: "TASK-GET-BYID-DBERROR",
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    return res.status(500).json({
      success: false,
      response: "Something went wrong while getting tasks...",
      errorId: "TASK-GET-BYID-DBERROR",
    });
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
    const timestamp = new Date().toISOString();
    console.error({
      errorId: "TASK-GET-QUERY-DBERROR",
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    return res.status(500).json({
      success: false,
      response: "Something went wrong while getting tasks...",
      errorId: "TASK-GET-QUERY-DBERROR",
    });
  }
};

const createTask = async (req, res) => {
  const body = req.body;

  try {
    const result = await insertOne(body);
    return res.status(201).json({ success: true, response: result });
  } catch (error) {
    const timestamp = new Date().toISOString();
    console.error({
      errorId: "TASK-CREATE-DBERROR",
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    return res.status(500).json({
      success: false,
      response: "Something went wrong while inserting data...",
      errorId: "TASK-CREATE-DBERROR",
    });
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
    const timestamp = new Date().toISOString();
    console.error({
      errorId: "TASK-UPDATE-DBERROR",
      message: error.message,
      stack: error.stack,
      timestamp,
    });

    return res.status(500).json({
      success: false,
      response: "Something went wrong while updating data...",
      errorId: "TASK-UPDATE-DBERROR",
    });
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
