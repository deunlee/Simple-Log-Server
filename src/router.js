const express = require('express');
const logger = require('./logger');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ success: false });
});

router.post('/', (req, res, next) => {
    const { level, msg } = req.body;
    if (typeof level !== 'string' || typeof msg !== 'string') {
        res.status(400);
        res.json({ success: false });
        return;
    }

    const ip = req.socket.remoteAddress;
    // req.headers['x-forwarded-for']
    const message = `(${ip}) ${msg}`;

    switch (level) {
    case 'info':
        logger.info(message);
        break;
    case 'warn':
        logger.warn(message);
        break;
    case 'error':
        logger.error(message);
        break;
    case 'debug':
        logger.debug(message);
        break;
    default:
        res.status(400);
        res.json({ success: false });
        return;
    }
    res.json({ success: true });
});

module.exports = router;
