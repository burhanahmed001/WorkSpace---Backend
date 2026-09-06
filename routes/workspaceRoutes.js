const express = require('express');
const router = express.Router();
const { createWorkspace, getWorkspaces, deleteWorkspace } = require('../controllers/workspaceController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createWorkspace);
router.get('/', authMiddleware, getWorkspaces);
router.delete('/:id', authMiddleware, deleteWorkspace);

module.exports = router;