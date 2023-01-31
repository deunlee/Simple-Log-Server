const express = require('express');
const logger = require('./logger');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ success: false });
});

router.post('/', (req, res, next) => {
    const { level, msg } = req.body;
    if (typeof level !== 'string' || typeof msg !== 'string') {
        res.json({ success: false });
        return;
    }
    switch (level) {
    case 'info':
        logger.info(msg);
        break;
    case 'warn':
        logger.warn(msg);
        break;
    case 'error':
        logger.error(msg);
        break;
    case 'debug':
        logger.debug(msg);
        break;
    default:
        res.json({ success: false });
        return;
    }
    res.json({ success: true });
});

module.exports = router;
