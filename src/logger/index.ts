import { buildDevLogger } from "./dev-logger";
import { buildProdLogger } from "./prod-logger";
import winston from "winston";

export let logger: winston.Logger;
if (process.env.NODE_ENV === "development") {
	logger = buildDevLogger();
} else {
	logger = buildProdLogger();
}
