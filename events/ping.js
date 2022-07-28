module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // ส่งคำสั่ง ping
        if (interaction.commandName == "ping") {
            await interaction.reply('pong')
        }
    }
}