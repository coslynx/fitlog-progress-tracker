const express = require('express');
const apiRouter = require('./api/index');
const { sequelize } = require('./config/database');

const app = express();
const port = 8080;

// Middleware to log incoming requests
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});


// Middleware for parsing JSON bodies
app.use(express.json());


// API Routes
app.use('/api', apiRouter);

// Generic error handler middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});


// Start the server
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
         app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();