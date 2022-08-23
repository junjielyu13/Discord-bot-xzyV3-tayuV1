var {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require("discord.js");

var { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("echo")
		.setType(ApplicationCommandType.User),

	async execute(interaction) {
		//Receiving context menu command interactions
		if (!interaction.isUserContextMenuCommand()) return;

		// Get the User's username from context menu
		const name = interaction.targetUser.username;
		console.log(name);
	},
};
