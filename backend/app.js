const express = require('express');
const cors = require('cors');
const alerts = require('./routes/alerts.routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cors());
app.use('/alerts', alerts);

module.exports = app;
