const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => res.status(200).send('Its working!'));

app.use('/api/register', require('./routes/registerRoutes'));

app.use('/api/login', require('./routes/loginRoutes'));

app.use('/api/tasklist', require('./routes/taskListRoutes'));

module.exports = app;
