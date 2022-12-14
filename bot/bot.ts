import { VoiceState } from "discord.js";

// Require the necessary discord.js classes
var fs = require("node:fs");
var path = require("node:path");
var {
	Client,
	Guild,
	Collection,
	GatewayIntentBits,
	InteractionType,
	GuildMemberManager,
	Intents,
} = require("discord.js");

var { dotenv } = require("dotenv").config();
var { updateCommands } = require("./bot-deploy-commands.ts");
var { ddbbConfig } = require("./database/config.ts");
var wait = require("node:timers/promises").setTimeout;
const { logger } = require("./log/logconfig");

logger.info("log test!!!!");

// set up ddbb
ddbbConfig();

// creating commands
updateCommands();

// Create a new client instance
export const client = new Client({
	intents: [7796],
});

client.on(
	"VoiceStateUpdate",
	async (oldState: VoiceState, newState: VoiceState) => {
		logger.info("new userr up !");
		const membernew = oldState.member;
		console.log("new userr up !");
		console.log(oldState);
		console.log(newState);
		console.log(`Readdasy! Logged in as ${membernew}`);
		const member = newState.member;
		console.log(`Ready! Logged in as ${member}`);
	}
);

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
			// const guild = interaction.guild;
			// guild.members
			// 	.fetch({ withPresences: true })
			// 	.then((fetchedMembers) => {
			// 		const totalOnline = fetchedMembers.filter(
			// 			(member) => member.presence?.status === "online"
			// 		);
			// 		// Now you have a collection with all online member objects in the totalOnline variable
			// 		console.log(
			// 			`There are currently ${totalOnline.size} members online in this guild!`
			// 		);
			// 	});

			if (!interaction.isChatInputCommand()) return;

			// if (interaction.commandName === "ping") { // message: 'Interaction has already been acknowledged.',
			// 	await interaction.reply("Pong!");
			// }

			if (!interaction.isButton()) return;

			if (!interaction.isSelectMenu()) return;

			// Component collectors select menu
			if (interaction.customId === "select") {
				await interaction.update({
					content: "Something was selected!",
					components: [],
				});
			}
			console.log(interaction);

			// #Component collectors
			const filter = (i) =>
				i.customId === "primary" && i.user.id === process.env.USER_ID;

			const collector =
				interaction.channel.createMessageComponentCollector({
					filter,
					time: 15000,
				});

			collector.on("collect", async (i) => {
				await i.update({
					content: "A button was clicked!",
					components: [],
				});

				if (i.customId === "primary") {
					await i.deferUpdate();
					await wait(4000);
					await i.editReply({
						content: "A button was clicked!",
						components: [],
					});
				}
			});

			collector.on("end", (collected) =>
				console.log(`Collected ${collected.size} items`)
			);
		});

		// Receiving modal submissions
		client.on("interactionCreate", async (interaction) => {
			if (interaction.type !== InteractionType.ModalSubmit) return;
			if (interaction.customId === "myModal") {
				await interaction.reply({
					content: "Your submission was received successfully!",
				});
			}

			//Extracting data from modal submissions
			// Get the data entered by the user
			const favoriteColor =
				interaction.fields.getTextInputValue("favoriteColorInput");
			const hobbies =
				interaction.fields.getTextInputValue("hobbiesInput");
			console.log({ favoriteColor, hobbies });
		});
	}
}

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);
