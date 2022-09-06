const log4js = require("log4js");

log4js.configure({
	appenders: {
		discord: { type: "file", filename: "discord.log" },
	},
	categories: {
		default: {
			appenders: ["discord"],
			level: "all",
			enableCallStack: true,
		},
	},
});

export const logger = log4js.getLogger("discord");


logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
