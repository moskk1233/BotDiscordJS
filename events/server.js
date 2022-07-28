const { PermissionFlagsBits } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        let guildOwner = await interaction.guild.fetchOwner().then(owner => owner)
        let guildRoles = await interaction.guild.roles.fetch().then(roles => roles)
        let guildPreview = await interaction.guild.fetchPreview().then(guild => guild)

        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName == "server") {
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
                return await interaction.reply({
                    content: `ขออภัยคุณไม่มีสิทธิ์ใช้คำสั่งนี้!`,
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
                        color: 16777215
                    }],
                    ephemeral: true
                }
            )
        }
    }
}