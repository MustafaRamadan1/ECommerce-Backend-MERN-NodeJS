import winston from 'winston'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(__filename);

const logger = winston.createLogger({

    transports: [
        new winston.transports.File({
            filename: `${__dirname}/../logs/errorLogs.log`,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => `${info.level}   ${info.timestamp}   ${info.message}`)
            ),
            level: 'error'
        }),

        new winston.transports.File({
            filename: `${__dirname}/../logs/infoLogs.log`,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(info => `${info.level}   ${info.timestamp}   ${info.message}`)
            )
        })
    ]
});

export default logger;