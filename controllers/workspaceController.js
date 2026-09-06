const Workspace = require('../models/Workspace'); // Apne model ka path dekh lein

// Create a new workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      user: req.user.id
    });
    const savedWorkspace = await newWorkspace.save();
    res.status(201).json({ success: true, workspace: savedWorkspace });
  } catch (error) {
    res.status(500).json({ message: "Failed to create workspace", error: error.message });
  }
};

// Get all workspaces for the logged-in user
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ user: req.user.id });
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workspaces", error: error.message });
  }
};