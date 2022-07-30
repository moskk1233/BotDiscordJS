const { color } = require("../config.json")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // ส่งคำสั่ง ping
        if (interaction.commandName == "ping") {
            await interaction.reply(
                {
                    embeds: [{
                        description: `การตอบสนอง: ${interaction.client.ws.ping}ms\n**${interaction.client.user.tag}** ทำงานได้ตาม`,
                        color: Number(color.cyan)
                    }],
                    ephemeral: true
                }
            )
        }
    }
}