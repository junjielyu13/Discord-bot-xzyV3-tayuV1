var { SlashCommandBuilder } = require("discord.js");
var {
	ActionRowBuilder,
	EmbedBuilder,
	SelectMenuBuilder,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setDescription("Display info about yourself."),

	async execute(interaction) {
		return interaction.reply({
			content: `Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`,

			// select menu
			components: [
				new ActionRowBuilder().addComponents(
					new SelectMenuBuilder()
						.setCustomId("select")
						.setPlaceholder("Nothing selected")
						.setMinValues(2)
						.setMaxValues(3)
						.addOptions([
							{
								label: "Select me",
								description: "This is a description",
								value: "first_option",
							},
							{
								label: "You can select me too",
								description: "This is also a description",
								value: "second_option",
							},
							{
								label: "I am also an option",
								description: "This is a description as well",
								value: "third_option",
							},
						])
				),
			],

			embeds: [
				new EmbedBuilder()
					.setColor(0x0099ff)
					.setTitle("Some title")
					.setURL("https://discord.js.org/")
					.setDescription("Some description here"),
			],
		});
	},
};
