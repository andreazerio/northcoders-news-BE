if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config');
const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const apiRouter = require('./routers/api');

mongoose.Promise = Promise;

mongoose.connect(db, {useMongoClient: true})
  .then(() => console.log('connected to database',db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());
app.use('/api', apiRouter);

app.use(function(err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (err.status === 404) res.status(404).send({message: err.message});
  if (err.status === 400) res.status(400).send({message: err.message});
    next(err);
  next();
});
app.use('/*', (req, res) => {
  res.status(404).send({message: 'Page not found'});
});
module.exports = app