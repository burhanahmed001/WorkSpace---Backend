const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/workspaces', require('./routes/workspaceRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/admin', require('./routes/adminRoutes')); // Yeh line add karein (agar file ka naam adminRoutes hai)
app.get('/', (req, res) => {
  res.send('Backend API is running successfully!');
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));