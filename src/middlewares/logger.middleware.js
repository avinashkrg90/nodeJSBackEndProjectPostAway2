import fs from 'fs'
import winston from 'winston';

const fsPromise = fs.promises;

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports:[
        new winston.transports.File({filename: 'logs.txt'})
    ]
});

const loggerMiddleware = async (req, res, next) => {
    if (!req.url.includes('signin')){
        const logData = `${new Date().toString()} - ${req.url} - ${JSON.stringify(req.body)}`
        logger.info(logData);
    }
    next();
}

export default loggerMiddleware;