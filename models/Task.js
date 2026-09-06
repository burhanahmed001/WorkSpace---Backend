const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['backlog', 'todo', 'in_progress', 'done'],
    default: 'todo'
  },
  dueDate: {
    type: String,
    default: null
  },
  assignee: {
    type: String,
    default: 'Burhan'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Task', taskSchema)