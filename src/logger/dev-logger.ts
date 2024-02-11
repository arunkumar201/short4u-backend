import { createLogger, format, transports } from "winston";

import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

const fileRotateTransport = new DailyRotateFile({
	filename: "logs/rotate-%DATE%.log",
	datePattern: "YYYY-MM-DD",
	maxSize: "20m",
	maxFiles: "14d",
	zippedArchive: true,
});

export function buildDevLogger() {
	return createLogger({
		level: "info",
		format: combine(
			timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
			logFormat
		),
		transports: [
			new transports.Console({
				format: combine(format.colorize(), format.simple()),
			}),
			fileRotateTransport,
		],
		exceptionHandlers: [
			new transports.File({ filename: "logs/exceptions.log" }),
		],
		exitOnError: false,
	});
}
