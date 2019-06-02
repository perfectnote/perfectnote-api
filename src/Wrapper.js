import dotenv from 'dotenv';

import express from 'express';
import apiSetup from './api/v1/api';

import connect from './db/connection.js';
import { Post } from './models';
import { log, logError } from './utils/Logger.js';

import bodyParser from 'body-parser';
import tokenBearer from 'express-bearer-token';
import cors from 'cors';

dotenv.config();
const app = express();
const db = connect(process.env.DB_URL);

export class Wrapper {
  constructor(options = {}) {
    this.options = options;
    this.log = log;
    this.logError = logError;
  }

  start(port = this.options.port || process.env.PORT || 5000) {
    app.disable('x-powered-by');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(tokenBearer());
    app.use(cors());
  
    app.use('/api/v1', apiSetup(express.Router()));

    app.listen(port, () => {
      this.log(`Listening on port ${port}`, 'API');
    });
  }
};