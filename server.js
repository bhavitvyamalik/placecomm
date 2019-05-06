const express = require('express');
const app = express();

var morgan = require('morgan');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Configuring the database
//const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });

// view engine setup
app.use(morgan('combined'));


app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// listen for requests

// Require Students routes
require('./app/routes/student.routes.js')(app);

// Require Companies routes
require('./app/routes/company.routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true});
