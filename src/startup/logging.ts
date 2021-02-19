require('express-async-errors');
import logger from '../middlewares/logging';

module.exports = (): void => {
  process.on('uncaughtException', (ex: any) => {
    logger.error(ex.message);
    logger.error(ex);
    console.log(ex);
    process.exit(1);
  });

  process.on('unhandledRejection', (ex: any) => {
    logger.error(ex.message);
    logger.error(ex);
    console.log(ex);
    process.exit(1);
  });
};
