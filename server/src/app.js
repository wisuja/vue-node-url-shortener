const express = require('express');
const cors = require('cors');

const app = express();

const routes = require('./routes/url_pair');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.options('/', cors());

app.get('/', (req, res) => {
  return res.send('URL Shortener API is live!');
});

app.use('/api', routes);

module.exports = app;
