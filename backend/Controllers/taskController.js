const express = require('express');
const router = express.Router();
const Task = require('../Model/taskModel');


router.get('/allTask', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({tasks: tasks});
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/task/:id', async (req, res) => {
  try {
    const task = await Task.findOne({_id: req.params.id});

    res.status(200).json({ task: task});
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  } 
});

router.post('/createTask', async (req, res) => {
  try {
    const existTask = await Task.findOne({ title: req.body.title });
    if (existTask) {
      return res.status(400).json({ error: 'Task already exists' });
    }
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate });
    await task.save();
    res.status(200).json({ status: 'Created' });
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  }
});


router.patch('/editTask/:id', async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, dueDate, status });
    res.status(200).json({ status: 'Updated' });
  } catch (err) {
    res.status(400).json({ error: 'Bad Request' });
  } 
});

router.delete('/deleteTask/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    const tasks = await Task.find()
    res.status(200).json({ status: 'Deleted', tasks: tasks });
  } catch (err) {
    res.status(404).json({ error: 'Task not found' });
  }
});

router.get('/filterTask/:status', async (req, res) =>{
  try {
    const tasks = await Task.find({ status: req.params.status });
    res.status(200).json({tasks:tasks})
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;