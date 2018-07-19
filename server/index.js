const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Answer API requests.
app.all('/api/*', function (req, res) {
  console.log('Handling request from URL: ', req.url);
  res.set('Content-Type', 'application/json');
  res.send(`{"message":"Hello from the custom server!", "url":"${req.url}"}`);
});

// All remaining requests return the React app, so it can handle routing.
app.all('*', function(req, res) {
  console.log('fall through request for url: ', req.url);
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, function () {
  console.error(`Node listening on port ${PORT}`);
});
