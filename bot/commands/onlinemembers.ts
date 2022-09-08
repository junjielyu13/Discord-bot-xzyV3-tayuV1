var { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("onlinemembers")
		.setDescription("显示目前DC有多少人在线。"),

	async execute(interaction) {
		var guild = interaction.guild;

		var string = "\n";
		var count = 0;
		guild.members.cache.forEach(function (member) {
			string = string + member.user.username + "\n";
			count += 1;
		});

		return interaction.reply(`在线人数: ${count} \nDC在线: ${string}\n `);
	},
};
