const Task = require('../models/Task');

const addTask = (req, res) => { // Render the add task page
    res.render('pages/addTask');
};

const createTask = async (req, res) => {
    try { // If the task is marked as complete, set the completed field to true
      if (req.body.complete) {
        req.body.completed = true;
      }
      await Task.create(req.body);  // Create a new task using the request body
      req.session.pendingMessage = "The task was created.";  // Set a success message and redirect to the tasks page
      res.redirect("/tasks");
    } catch (err) {
      if (err.name === "ValidationError") {  // If there was a validation error, set an error message with the error details
        res.locals.message = Object.values(err.errors)
          .map((item) => item.message)
          .join(", ");
      } else {
        res.locals.message = "Something went wrong.";  // If there was another error, set a generic error message
      }
      res.render("pages/addTask");  // Render the add task page again with the error message
    }
  };

  const deleteTask = async (req, res) => {
    try { 
        const task = await Task.findByIdAndDelete(req.params.id);  // Find and delete the task with the specified ID
        if (!task) { // Set a success or error message based on whether the task was found
            req.session.pendingMessage = "The task does not exist.";
        } else {
            req.session.pendingMessage = "The task was deleted.";
        }
        res.redirect("/tasks");   // Redirect to the tasks page
    } catch (err) {  // If there was an error, set an error message and redirect to the tasks page
        req.session.pendingMessage = "Something went wrong.";
        res.redirect("/tasks");
    }
};

const editTask = async (req, res) => {
    try {  // Find the task to be edited and render the edit task page
        const task = await Task.findById(req.params.id)
        res.render('pages/editTask', { task })
    } catch (err) {  // Set an error message if an error occurred while finding the task
        req.session.pendingMessage = 'Something went wrong.'
        res.redirect('/tasks')
    }
}

const updateTask = async (req, res) => {
    let task = false;
    try {
      if (req.body.complete) {  // If the task is marked as complete, set the 'completed' field to true
        req.body.completed = true;
      }
      task = await Task.findById(req.params.id);  // Find the task to be updated
      await Task.findByIdAndUpdate(req.params.id, req.body, {  // Update the task and redirect to the task list page
        runValidators: true,
      });
      req.session.pendingMessage = "The task was updated.";
      res.redirect("/tasks");
    } catch (err) {
      if (err.name === "ValidationError") {  // Handle errors that occur during task update
        res.locals.message = Object.values(err.errors)  // If the error is a validation error, set the error message to the validation error messages
          .map((item) => item.message)
          .join(", ");
      } else {
        res.locals.message = "Something went wrong.";  // Otherwise, set a generic error message
      }
      if (task) {
        res.render("pages/editTask", { task }); // render the editTask page with the task object if there is an error
      } else {
        req.session.pendingMessage = "Something went wrong.";
        res.redirect("/tasks");  // redirect to tasks page if there is an error
      }
    }
  };

  const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find();  // find all tasks
      res.render("pages/tasks", { tasks });  // render the tasks page with the tasks object
    } catch (err) {
      res.locals.message = "Something went wrong.";
      res.render("pages/tasks", { tasks: [] });  // render the tasks page with an empty tasks object if there is an error
    }
  };

module.exports = {
    addTask,
    createTask,
    deleteTask,
    updateTask,
    editTask,
    getTasks
};