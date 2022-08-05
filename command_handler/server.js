const { PermissionFlagsBits } = require("discord.js")
const { color, error_msg } = require("../config.json") // Bot Error Messages
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("ดูรายละเอียดของเซิฟเวอร์"),
    async execute(interaction) {
        /* กำหนดตัวแปรฝั่ง guild */
        const guildOwner = await interaction.guild.fetchOwner().then(owner => owner)
        const guildRoles = await interaction.guild.roles.fetch().then(roles => roles)
        const guildPreview = await interaction.guild.fetchPreview().then(guild => guild)

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
            return await interaction.reply({
                embeds: [{
                    description: `${error_msg[0]}`,
                    color: Number(color.error)
                }],
                ephemeral: true
            })
        }

        await interaction.reply(
            {
                embeds: [{
                    title: `ข้อมูลกิลด์ ${interaction.guild.name}`,
                    thumbnail: {
                        url: `${guildPreview.iconURL({ extension: 'png' })}`
                    },
                    description: `เจ้าของ: ${guildOwner.user.tag}\nสร้างเมื่อ: <t:${Math.floor(interaction.guild.createdTimestamp / 1000)}:F>\nมีสมาชิกทั้งหมด: ${interaction.guild.memberCount} แอคเคาท์\nมีจำนวนบทบาททั้งหมด: ${guildRoles.size} บทบาท\nมีจำนวนห้องแชท/ห้องเสียง: ${interaction.guild.channels.channelCountWithoutThreads} ห้อง`,
                    color: Number(color.action)
                }],
                ephemeral: true
            }
        )
    }
}