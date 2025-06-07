const express = require("express");
const router = express.Router();

const {
  getTaskById,
  getTasks,
  createTask,
  updateTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

router.route("/").get(getTasks).post(createTask);

router.route("/search").get(getTasks).put(updateTask);

router.route("/:id").get(getTaskById).patch(updateTaskById).delete(deleteTask);

module.exports = router;
