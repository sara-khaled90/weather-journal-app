// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server

const hostname = "127.0.0.1";
const port = 5000;

//Spin up the server
// Print a log once the server starts listening
app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});

// GET route
app.get('/all', (req, res) =>
    res.status(200).send(projectData)
);


// POST route
app.post('/add', (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
});