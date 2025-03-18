const Task = require('../models/Task');

// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create a new task
// exports.createTask = async (req, res) => {
//   const task = new Task(req.body);
//   try {
//     const newTask = await task.save();
//     res.status(201).json(newTask);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };
exports.createTask = async (req, res) => {
    try {
      const { name, status, tasks } = req.body; 
      const newTask = new Task({ name, status, tasks });
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ id: req.params.id });
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};