var { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gif")
		.setDescription("Sends a random gif!")
		.addStringOption((option) =>
			option
				.setName("category")
				.setDescription("The gif category")
				.setRequired(true)
				.addChoices(
					{ name: "Funny", value: "gif_funny" },
					{ name: "Meme", value: "gif_meme" },
					{ name: "Movie", value: "gif_movie" }
				)
		),

	async execute(interaction) {
		//Deferred responses
		await interaction.deferReply({ ephemeral: true }); // -bot xzyV3-tayuV1正在响应……
		await wait(4000);
		await interaction.editReply("Choices test!!");
	},
};
