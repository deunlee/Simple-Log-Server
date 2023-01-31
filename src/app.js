const path = require('path');
const express = require('express');
const createError = require('http-errors');

const logger = require('./logger');
const router = require('./router');

function main() {
    const app = express();
    app.disable('x-powered-by');
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    // app.use(express.static(path.join(__dirname, 'public')));
    
    app.use('/', router);
    
    app.use((req, res, next) => {
        next(createError(404));
    });
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({ success: false });
    });
    
    const port   = parseInt(process.env.PORT || '7000', 10);
    const server = app.listen(port, () => {
        logger.info(`The server is running on port ${port}.`);
    });
    
    process.stdin.resume();
    function exitHandler(options, exitCode) {
        logger.info(`Exiting the server...`);
        if (options.cleanup) server.close();
        if (options.exit) process.exit();
    }
    process.on('exit',    exitHandler.bind(null, { cleanup: true }));
    process.on('SIGINT',  exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
    process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}
main();
