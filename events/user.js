const { color } = require("../config.json")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        
        else if (interaction.commandName == "user") {
            const getUserInfo = interaction.options.getMember("user")
            if (getUserInfo) {
                if (!getUserInfo.user.avatarURL()) {
                    await interaction.reply(
                        {
                            embeds: [
                                {
                                    title: `ข้อมูลของคุณ ${getUserInfo.user.tag}`,
                                    description: `ชื่อ: ${getUserInfo.user.tag}\nสร้างเมื่อ: <t:${Math.floor(getUserInfo.user.createdTimestamp / 1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(getUserInfo.joinedTimestamp / 1000)}:F>`,
                                    color: Number(color.cyan)
                                }
                            ],
                            ephemeral: true
                        }
                    )
                    return;
                }
                await interaction.reply(
                    {
                        embeds: [
                            {
                                title: `ข้อมูลของคุณ ${getUserInfo.user.tag}`,
                                thumbnail: {
                                    url: `${getUserInfo.user.avatarURL({ extension: "png" })}`
                                },
                                description: `ชื่อ: ${getUserInfo.user.tag}\nสร้างเมื่อ: <t:${Math.floor(getUserInfo.user.createdTimestamp / 1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(getUserInfo.joinedTimestamp / 1000)}:F>`,
                                color: Number(color.cyan)
                            }
                        ],
                        ephemeral: true
                    }
                )
            }

            else {
                if (!interaction.user.avatarURL()) {
                    await interaction.reply(
                        {
                            embeds: [{
                                title: `ข้อมูลของคุณ ${interaction.user.tag}`,
                                description: `ชื่อ: ${interaction.user.tag}\nสร้างเมื่อ: <t:${Math.floor(interaction.user.createdTimestamp / 1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:F>`,
                                color: Number(color.cyan)
                            }],
                            ephemeral: true
                        }
                    )
                    return;
                }
                await interaction.reply(
                    {
                        embeds: [{
                            title: `ข้อมูลของคุณ ${interaction.user.tag}`,
                            thumbnail: {
                                url: `${interaction.user.avatarURL({ extension: "png" })}`
                            },
                            description: `ชื่อ: ${interaction.user.tag}\nสร้างเมื่อ: <t:${Math.floor(interaction.user.createdTimestamp / 1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:F>`,
                            color: Number(color.cyan)
                        }],
                        ephemeral: true
                    }
                )
            }
        }
    }
}