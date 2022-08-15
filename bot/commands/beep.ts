var { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
var wait = require("node:timers/promises").setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("beep")
		.setDescription("Beep!")
		.setDMPermission(false)
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers
		),

	async execute(interaction) {
		// Editing responses
		await interaction.reply("boob!");
		await wait(2000);
		await interaction.editReply("Pong again!");
		// delete reply
		await interaction.deleteReply();

		// fetching and deleting responses
		// const message = await interaction.fetchReply();
		// console.log(message);
	},
};
