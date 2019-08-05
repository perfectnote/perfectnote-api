import { connect } from 'mongoose';
import log from './../utils/logger/index.js'

export default (dbURL, options = {}) => {
  connect(dbURL, options)
    .then(db => {
      log(`Successfully connected to ${dbURL}.`, 'API');
      return db;
    })
    .catch(err => {
      if (err.message.code === 'ETIMEDOUT') {
        log('Attempting to re-establish database connection.', 'API');
        connect(dbURL);
      } else {
        log('Error while attempting to connect to database:', 'API');
        log(err);
      }
    });
};