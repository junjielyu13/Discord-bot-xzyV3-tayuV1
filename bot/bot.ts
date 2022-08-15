// Require the necessary discord.js classes
var fs = require("node:fs");
var path = require("node:path");
var { Client, Collection, GatewayIntentBits } = require("discord.js");
var { dotenv } = require("dotenv").config();
var { updateCommands } = require("./bot-deploy-commands.ts");

// creating commands
updateCommands();

// Create a new client instance
export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
var commandsPath = path.join(__dirname, "commands");
var commandFiles = fs
	.readdirSync(commandsPath)
	.filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, async (...args) => event.execute(...args));
	} else {
		client.on(event.name, async (...args) => event.execute(...args));
	}

	if (event.name === "interactionCreate") {
		client.on(event.name, async (interaction) => {
			if (!interaction.isChatInputCommand()) return;

			// if (interaction.commandName === "ping") { // message: 'Interaction has already been acknowledged.',
			// 	await interaction.reply("Pong!");
			// }
		});
	}
}

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
