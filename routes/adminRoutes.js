const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Workspace = require('../models/Workspace');
const { authMiddleware, adminOnly } = require('../middleware/authMiddleware');

// Get admin dashboard stats (Sirf non-admin users count honge)
router.get('/stats', authMiddleware, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });
    const totalWorkspaces = await Workspace.countDocuments();
    res.status(200).json({
      totalUsers,
      totalWorkspaces
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
});

// Get all users (Table mein sirf non-admin users dikhane ke liye { role: { $ne: 'admin' } } lagaya hai)
router.get('/users', authMiddleware, adminOnly, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

module.exports = router;