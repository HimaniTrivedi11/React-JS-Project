const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all users
router.get("/", async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});

// Update User
router.put("/:id", async (req, res) => {
    try{
        const updatedTask = await Task.findOneAndUpdate(
            { id : req.params.id },
            req.body,
            {new : true}
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({message : error.message});
    }
}); 

// Create user
router.post("/", async (req, res) => {
    const user = new Task(req.body);
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({message: err.message});
    }
  });

module.exports = router;