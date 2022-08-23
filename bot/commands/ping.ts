var {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} = require("discord.js");

var wait = require("node:timers/promises").setTimeout;

var { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),

	async execute(interaction) {
		return await interaction.reply({
			content: "Pong!",
			ephemeral: true,
			components: [
				// Button
				new ActionRowBuilder().addComponents(
					new ButtonBuilder()
						.setCustomId("primary")
						.setLabel("Primary")
						.setStyle(ButtonStyle.Primary)
					//.setDisabled(true)
				),
			],
			embeds: [
				// embed
				new EmbedBuilder()
					.setColor(0x0099ff)
					.setTitle("Some title")
					.setURL("https://discord.js.org")
					.setDescription("Somme description here"),
			],
		});
	},
};
