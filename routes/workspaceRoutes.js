const express = require('express');
const router = express.Router();
const { createWorkspace, getWorkspaces } = require('../controllers/workspaceController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createWorkspace);
router.get('/', authMiddleware, getWorkspaces);

module.exports = router;