import winston from "winston";
import "winston-daily-rotate-file";

const transport = new winston.transports.DailyRotateFile({
    filename: "./logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "1m",
    maxFiles: "14d",
    level: "error",
    handleExceptions: true,
});

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.json({ space: 2 }),
        winston.format.timestamp({
            format: "YYYY-MM-DD hh:mm:ss.SSS A",
        }),
        winston.format.label({ label: "[LOGGER]" }),
        winston.format.printf(
            (info) =>
                ` ${info.label} ${info.timestamp} ${info.level.toUpperCase()} : ${info.message}`
        )
    ),
    transports: [
        new winston.transports.Console({
            level: "info",
            handleExceptions: true,
            format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
        transport,
    ],
});

export default logger;