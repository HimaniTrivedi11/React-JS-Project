const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  tasks: [String],
});

module.exports = mongoose.model('Task', taskSchema);