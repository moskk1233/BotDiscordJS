const { color, random_msg } = require("../config.json")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("bot")
		.setDescription("ดูรายละเอียดของบอท"),
	async execute(interaction) {
		await interaction.reply(
			{
				embeds: [{
					thumbnail: {
						url: `${interaction.client.user.avatarURL({ extension: 'png' })}`
					},
					title: `ข้อมูลบอท ${interaction.client.user.tag}`,
					description: `สร้างเมื่อ: <t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:F>\n\n*${random_msg[Math.floor(Math.random() * random_msg.length)]}*`,
					color: Number(color.action)
				}],
				ephemeral: true
			}
		)
	}
}
