const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  getTaskByQuery,
  createTask,
  updateTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);

router.route("/search").get(getTaskByQuery).put(updateTask);

router.route("/:id").get(getTaskById).patch(updateTaskById).delete(deleteTask);

module.exports = router;
