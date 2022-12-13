const { PermissionFlagsBits } = require("discord.js")
const { color, error_msg }= require("../config.json") 
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("ลบข้อความตามที่คุณต้องการ")
    .addNumberOption(number => number.setName("count")
        .setDescription("จำนวนข้อความที่ต้องการลบแต่ไม่เกิน50ข้อความ")
        .setRequired(true)),
    async execute(interaction) {
        const message_count = interaction.options.getNumber("count")

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return await interaction.reply({
                embeds: [{
                    description: `${error_msg[0]}`,
                    color: Number(color.error)
                }],
                ephemeral: true
            })
        }

        if (message_count > 0 && message_count <= 50) {
            let messages = await interaction.channel.messages.fetch({ limit: message_count })
            await messages.forEach(msg => msg.delete())
            await interaction.reply({ 
                    embeds: [{
                        description: `${interaction.client.user.username} ได้ลบ ${message_count} ข้อความเรียบร้อยแล้ว`,
                        color: Number(color.success)
                    }],
                    fetchReply: true
            }).then(async msg => {
                await sleep(5)
                await msg.delete()
            }).catch(err => console.log(err))
        } else {
            await interaction.reply({
                embeds: [{
                    description: "คุณไม่สามารถลบข้อความได้เนื่องจากคุณใช้เลขน้อยกว่า 0 หรือมากกว่า 50",
                    color: Number(color.error),
                }],
                fetchReply: true
            }).then(async msg => {
                await sleep(5)
                await msg.delete()
            }).catch(err => console.log(err))
        }
    }
}

/**
 * sleep function is delay to wait.
 * @param {number} time - Time in second
 */

function sleep(time) {
    const second = time * 1000
    return new Promise((resolve) => {
        setTimeout(resolve, second);
    });
}