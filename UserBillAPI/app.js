const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const billRoutes = require('./routes/billRoutes');
const cors = require('cors');

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', billRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
