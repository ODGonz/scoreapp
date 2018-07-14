const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');
const cors = require('cors');

// MongoDB Connection
mongoose.connect(config.database, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log(`Mongoose connected at: ${config.database}`));

mongoose.connection.on('error', (err) => console.log(`DATABASE ERROR: ${err}`));

// Express
const app = express();

// Users Route
const users = require('./routes/users');

// Port
const port = process.env.PORT || 8080;

// Cors Middleware
app.use(cors());

// Public View
app.use(express.static(__dirname + '/public'));

// Body Parser
app.use(bodyParser.json());

app.use('/users', users);

// Connection to Port
app.listen(port, () => console.log(`Listening on port: ${port}`));
