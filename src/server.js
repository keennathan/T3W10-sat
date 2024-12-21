// Here, we configure the application server

// Reason for separation:
// Don't often need to start the server
// Can import the app without worrying about starting the server

// Import the express library
const express = require('express');

// Make an instance of the express server
const app = express();

// Buil-in middleware for server to receive JSON body data
app.use(express.json());

// Start defining routes: instance.verb(url, middleware/callback)
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

const UserRouter = require('./routes/users.js');
app.use('/users', UserRouter);

// Error-handling middleware
app.use((error, req, res, next) => {
    console.log("Server threw an error: " + error.message);
    res.status(500).json({
        status: 500,
        error: error.message,
        errorFull: JSON.stringify(error)
    });
});

// Export the app
module.exports = { 
    app 
};