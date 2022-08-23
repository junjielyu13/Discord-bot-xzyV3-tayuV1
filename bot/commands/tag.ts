var { SlashCommandBuilder, InteractionType } = require("discord.js");

// Autocomplete
module.exports = {
	data: new SlashCommandBuilder()
		.setName("tag")
		.setDescription("Replies with Pong!")
		.addStringOption((option) =>
			option
				.setName("autocomplete")
				.setDescription("Enter your choice")
				.setAutocomplete(true)
		),

	async execute(interaction) {
		if (interaction.type !== InteractionType.ApplicationCommandAutocomplete)
			return;

		if (interaction.commandName === "tag") {
			const focusedOption = interaction.options.getFocused(true);
			let choices;

			if (focusedOption.name === "name") {
				choices = ["faq", "install", "collection", "promise", "debug"];
			}

			if (focusedOption.name === "theme") {
				choices = ["halloween", "christmas", "summer"];
			}

			const filtered = choices.filter((choice) =>
				choice.startsWith(focusedOption.value)
			);

			await interaction.respond(
				filtered.map((choice) => ({ name: choice, value: choice }))
			);
		}

		console.log(interaction);

		return await interaction.reply({
			content: "Pong!",
		});
	},
};
