// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// an instance of their app using express
const app = express();

// require bodyParser
const bodyParser = require('body-parser');

// To configuring express to use bodyParser as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// require cors to allow to commincate across the web
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, () => {
    console.log(`Done! , Server is work on port : ${port}`);
});

// Get all data in '/all' direction to localserver
app.get('/all', (req, res) => {
    res.send(projectData);
});

// Post all data to '/add direction
app.post('/add', (req, res) => {
    console.log(req.body)
    newdata = {
        date: req.body.date,
        temperature: req.body.temperature,
        user_response: req.body.user_response
    }
    projectData = newdata;
    res.send(newdata);
});