// Here, we configure the application server

// Reason for separation:
// Don't often need to start the server
// Can import the app without worrying about starting the server

// Import the express library
const express = require('express');

// Make an instance of the express server
const app = express();

// Start defining routes: instance.verb(url, middleware/callback)
app.get('/', (req, res) => {
    res.json({
        message:'Hello, world!'
    });
});


// Export the app
module.exports = { 
    app 
};