const express = require("express");

const router = express.Router();
const {  // Importing the controller functions for handling requests related to tasks
  addTask,
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  editTask,
} = require("../controllers/tasks");
// Defining the routes and the corresponding HTTP methods and controller functions
router.route("/").post(createTask).get(getTasks); // For creating a new task and getting all tasks
router.route("/edit/:id").get(editTask);  // For rendering the task edit page
router.route("/delete/:id").get(deleteTask);  // For deleting a task
router.route("/update/:id").post(updateTask);  // For updating a task
router.route("/add").get(addTask);  // For rendering the add task page

module.exports = router;