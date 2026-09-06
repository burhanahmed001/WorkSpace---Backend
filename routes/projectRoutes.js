const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const { authMiddleware } = require('../middleware/authMiddleware') // Braces ke sath import karein

// Get all projects for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id })
    res.status(200).json(projects)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message })
  }
})

// Create new project
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, description, category, workspaceId } = req.body
    const newProject = new Project({
      name,
      description,
      category,
      workspace: workspaceId || null,
      user: req.user.id
    })

    const savedProject = await newProject.save()
    res.status(201).json({ success: true, project: savedProject })
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message })
  }
})

module.exports = router