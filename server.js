
const express = require('express');
const path = require('path');
const discordRoute = require('./api/discord')
const app = express();
require('dotenv').config();
console.log(process.env.CLIENT_ID);
app.use('/api/discord', discordRoute);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './HTML/index.html'));
});


app.listen(50451, () => {
  console.info('Running on port 50451');
});

app.use((err, req, res, next) => {
    switch (err.message) {
      case 'NoCodeProvided':
        return res.status(400).send({
          status: 'ERROR',
          error: err.message,
        });
      default:
        return res.status(500).send({
          status: 'ERROR',
          error: err.message,
        });
    }
  });