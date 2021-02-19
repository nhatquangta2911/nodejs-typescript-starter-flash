const mongoose = require('mongoose');
import logger from '../middlewares/logging';
import config from '../../config';

const databaseConnection = config.DATABASE_CONNECTION || '';

module.exports = () => {
  mongoose
    .connect(databaseConnection, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    .then(() =>
      logger.info(`CONNECTED TO DATABASE ${config.DATABASE_CONNECTION}`)
    );
};
