if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const apiRouter = require('./routers');
const cors = require('cors');

mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('connected to database',db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());
app.use(cors());
app.use('/',express.static('public'));
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  if(err.status === 404) return res.status(404).send({message: err.message});
  if(err.status === 400) return res.status(400).send({message: err.message});
  else return next(err);
});
app.use('/*', (req, res) => {
  res.status(404).send({message: 'Page not found'});
});

app.use((err, req, res) => {
  res.status(500).send({err});
});
module.exports = app;