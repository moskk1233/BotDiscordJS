const { color } = require("../config.json")
const { SlashCommandBuilder} = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ตรวจสอบบทว่าทำงานได้ปกติหรือไม่"),
    async execute(interaction) {
        await interaction.reply(
            {
                embeds: [{
                    description: `การตอบสนอง: ${interaction.client.ws.ping}ms\n**${interaction.client.user.tag}** ทำงานได้ตาม`,
                    color: Number(color.action)
                }],
                ephemeral: true
            }
        )
    }
}