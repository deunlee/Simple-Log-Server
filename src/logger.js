const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');

const logDir      = './logs'; // Automatically create directory
const logErrorDir = './logs/error';

// Log Level: error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
const env   = (process.env.NODE_ENV || 'development');
const isDev = (env === 'development');
const level = isDev ? 'debug' : 'info'; // warn

const colors = {
    error : 'red',
    warn  : 'yellow',
    info  : 'green',
    http  : 'magenta',
    debug : 'blue',
};
winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] ${info.message}`;
    }),
);

const logger = winston.createLogger({
    format,
    transports: [
        new winstonDaily({
            level,
            datePattern   : 'YYYY-MM-DD',
            dirname       : logDir,
            filename      : '%DATE%.log',
            // maxFiles      : 30,
            // zippedArchive : true,
        }),
        new winstonDaily({
            level         : 'error',
            datePattern   : 'YYYY-MM-DD',
            dirname       : logErrorDir,
            filename      : '%DATE%.error.log',
            // maxFiles      : 30,
            // zippedArchive : true,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            level,
            format,
            handleExceptions : true,
        }),
    );
}

module.exports = logger;
