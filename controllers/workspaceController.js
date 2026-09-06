const Workspace = require('../models/Workspace');

// Create a new workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      owner: req.user.id // Yahan 'user' ki jagah 'owner' hona chahiye
    });
    const savedWorkspace = await newWorkspace.save();
    res.status(201).json({ success: true, workspace: savedWorkspace });
  } catch (error) {
    res.status(500).json({ message: "Failed to create workspace", error: error.message });
  }
};

// Get all workspaces for workspace owner/user
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({ owner: req.user.id }); // Yahan bhi 'owner' karein
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workspaces", error: error.message });
  }
};