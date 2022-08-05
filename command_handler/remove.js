const { PermissionFlagsBits } = require("discord.js")
const { color, error_msg }= require("../config.json") 
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("ลบข้อความใน 14 วันที่ผ่านมา")
    .addNumberOption(number => number.setName("count")
        .setDescription("จำนวนข้อความที่ต้องการลบ")
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

        if (message_count) {
            if (message_count > 0 && message_count <= 50) {
                await interaction.channel.bulkDelete(message_count, true)
                interaction.reply(
                    { 
                        embeds: [{
                            description: `${interaction.client.user.username} ได้ลบ ${message_count} ข้อความเรียบร้อยแล้ว`,
                            color: Number(color.success)
                        }],
                    }
                )
                await sleep(2)
                await interaction.channel.lastMessage.delete()
            } else {
                await interaction.reply({
                    embeds: [{
                        description: "คุณไม่สามารถลบข้อความได้เนื่องจากคุณลบข้อความเกิน 50 ข้อความ",
                        color: Number(color.error),
                    }],
                })
                await sleep(2)
                await interaction.channel.lastMessage.delete()
            }
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