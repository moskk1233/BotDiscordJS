const { PermissionFlagsBits } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "remove") {
            const message_count = interaction.options.getNumber("count")

            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                return await interaction.reply({
                    content: `ขออภัยคุณไม่มีสิทธิ์ใช้คำสั่งนี้!`,
                    ephemeral: true
                })
            }

            if (message_count) {
                if (message_count > 0 && message_count <= 50) {
                    await interaction.channel.bulkDelete(message_count, true)
                    interaction.reply(
                        { content: `${interaction.client.user.username} ได้ลบ ${message_count} ข้อความเรียบร้อยแล้ว` }
                    )
                    await sleep(2000)
                    await interaction.channel.lastMessage.delete()
                } else {
                    await interaction.reply("คุณไม่สามารถลบข้อความได้เนื่องจากคุณลบข้อความเกิน 50 ข้อความ")
                    await sleep(2000)
                    await interaction.channel.lastMessage.delete()
                }
            }
        }
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}