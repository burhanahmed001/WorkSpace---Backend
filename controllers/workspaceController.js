const Workspace = require('../models/Workspace');

// Create a new workspace
exports.createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newWorkspace = new Workspace({
      name,
      description,
      owner: req.user.id
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
    const workspaces = await Workspace.find({ owner: req.user.id });
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch workspaces", error: error.message });
  }
};

// Delete a workspace
exports.deleteWorkspace = async (req, res) => {
  try {
    const deletedWorkspace = await Workspace.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });
    if (!deletedWorkspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }
    res.status(200).json({ success: true, message: "Workspace deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete workspace", error: error.message });
  }
};