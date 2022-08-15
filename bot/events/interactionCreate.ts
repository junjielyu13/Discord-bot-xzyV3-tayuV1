var { client } = require("../bot.ts");

module.exports = {
	name: "interactionCreate",

	async execute(interaction) {
		console.log(
			`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
		);
		// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({
				content: "There was an error while executing this command!",
				ephemeral: true,
			});
		}
	},
};

// client.on("interactionCreate", async (interaction) => {
// 	if (!interaction.isChatInputCommand()) return;

// 	const command = client.commands.get(interaction.commandName);

// 	if (!command) return;

// 	try {
// 		await command.execute(interaction);
// 	} catch (error) {
// 		console.error(error);
// 		await interaction.reply({
// 			content: "There was an error while executing this command!",
// 			ephemeral: true,
// 		});
// 	}
// });
