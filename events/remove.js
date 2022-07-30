const { PermissionFlagsBits } = require("discord.js")
const { color, error_msg }= require("../config.json") 

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "remove") {
            const message_count = interaction.options.getNumber("count")

            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                return await interaction.reply({
                    embeds: [{
                        description: `${error_msg[0]}`,
                        color: Number(color.red)
                    }],
                    ephemeral: true
                })
            }

            if (message_count) {
                if (message_count > 0 && message_count <= 50) {
                    await interaction.channel.bulkDelete(message_count, true)
                    interaction.reply(
                        { 
                            embeds: [{
                                description: `${interaction.client.user.username} ได้ลบ ${message_count} ข้อความเรียบร้อยแล้ว`,
                                color: Number(color.green)
                            }],
                            ephemeral: true
                        }
                    )
                    await sleep(2000)
                    await interaction.channel.lastMessage.delete()
                } else {
                    await interaction.reply({
                        embeds: [{
                            description: "คุณไม่สามารถลบข้อความได้เนื่องจากคุณลบข้อความเกิน 50 ข้อความ",
                            color: Number(color.red),
                        }],
                        ephemeral: true
                    })
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