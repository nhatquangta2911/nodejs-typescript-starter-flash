import express, { Application } from 'express';
import logger from '../src/middlewares/logging';
import config from '../config';

const app: Application = express();

require('./startup/logging')();
require('./startup/database')();
require('./startup/production')(app);
require('./startup/routes')(app);

const port = config.PORT || 5055;

const server = app.listen(port, function () {
  logger.info(`Listening on port ${port}`);
});

export default server;
