module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "bot") {
            await interaction.reply(
                {
                    content: `บอทชื่อ : ${interaction.client.user.tag}\nสร้างเมื่อ : <t:${Math.floor(interaction.client.user.createdTimestamp / 1000)}:F>\nผู้สร้าง : Moskuza#5798`,
                    ephemeral: true
                }
            )
        }
    }
}