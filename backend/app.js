var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('./mongoose');
var cors = require('cors');
var userRoutes = require('./routes/userRoutes');
var inputRoutes = require('./routes/inputRoutes');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

app.use('/api/input', inputRoutes);

module.exports = app;
