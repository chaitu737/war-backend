const express = require('express');
const csvtojson = require("csvtojson");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();// todo only for devlopment not for production 
const logger = require('./middleware/logger');
const app = express();






const port = process.env.port || 3000;
mongoose.Promise = global.Promise;


app.use(cors());

app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());

  app.get('/', (_r, res) => {
	res.status(200).send('Hello world');
});

require('./config/db.config');
require('./routes')(app);


app.listen(port, () => logger.info(`Listening on port ${port}`));




  