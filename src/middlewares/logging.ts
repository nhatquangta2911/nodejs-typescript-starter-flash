import { transports, createLogger, format } from 'winston';

const { combine, timestamp, prettyPrint, json } = format;

const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json(),
    prettyPrint({ colorize: true, depth: 3 })
  ),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.colorize()
    })
  );
}

export default logger;
