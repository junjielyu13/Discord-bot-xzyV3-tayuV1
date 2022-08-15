// Require the necessary discord.js classes
var fs = require("node:fs");
var path = require("node:path");
var { REST } = require("@discordjs/rest");
var { Routes } = require("discord.js");
var { dotenv } = require("dotenv").config();

export function updateCommands() {
	var commands = [];
	var commandsPath = path.join(__dirname, "commands");
	var commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".ts"));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		commands.push(command.data.toJSON());
	}

	var rest = new REST({ version: "10" }).setToken(process.env.BOT_TOKEN);

	(async () => {
		try {
			rest.put(
				Routes.applicationGuildCommands(
					process.env.CLIENT_ID,
					process.env.GUILD_ID
				),
				{
					body: commands,
				}
			)
				.then(() =>
					console.log("Successfully registered application commands.")
				)
				.catch(console.error);
		} catch (error) {
			console.error(error);
		}
	})();
}
