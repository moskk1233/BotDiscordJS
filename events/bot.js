const { color, random_msg } = require("../config.json")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "bot") {
            await interaction.reply(
                {
                    embeds: [{
                        thumbnail: {
                            url: `${interaction.client.user.avatarURL({ extension: 'png' })}`
                        },
                        title: `ข้อมูลบอท ${interaction.client.user.tag}`,
                        description: `สร้างเมื่อ: <t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:F>\n\n*${random_msg[Math.floor(Math.random()*random_msg.length)]}*`,
                        color: Number(color.cyan)
                    }],
                    ephemeral: true
                }
            )
        }
    }
}