module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        // ส่งคำสั่ง ping
        if (interaction.commandName == "ping"){
            await interaction.reply('pong')
        }
    
        // ส่งคำสั่ง user เพื่อดูข้อมูล user
        else if (interaction.commandName == "user") {
            const getUserInfo = interaction.options.getMember("user")
            if (getUserInfo) {
                if (!getUserInfo.user.avatarURL()) {
                    await interaction.reply(
                        {
                            embeds: [
                                {
                                    title: `ข้อมูลของคุณ ${getUserInfo.user.tag}`,
                                    description: `ชื่อ: ${getUserInfo.user.tag}\nสร้างเมื่อ: <t:${Math.floor(getUserInfo.user.createdTimestamp/1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(getUserInfo.joinedTimestamp/1000)}:F>`,
                                    color: 16777215
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
                                description: `ชื่อ: ${getUserInfo.user.tag}\nสร้างเมื่อ: <t:${Math.floor(getUserInfo.user.createdTimestamp/1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(getUserInfo.joinedTimestamp/1000)}:F>`,
                                color : 16777215
                            }
                        ],
                        ephemeral: true
                    }
                )
            }
            
            else {
                if (!interaction.user.avatarURL()) {
                    await interaction.reply(
                        { embeds: [{
                            title: `ข้อมูลของคุณ ${interaction.user.tag}`,
                            description: `ชื่อ: ${interaction.user.tag}\nสร้างเมื่อ: <t:${Math.floor(interaction.user.createdTimestamp/1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(interaction.member.joinedTimestamp/1000)}:F>`,
                            color : 16777215
                        }],
                        ephemeral: true}
                    ) 
                    return;
                }
                await interaction.reply(
                        { embeds: [{
                            title: `ข้อมูลของคุณ ${interaction.user.tag}`,
                            thumbnail: {
                                url: `${interaction.user.avatarURL({ extension: "png" })}`
                            },
                            description: `ชื่อ: ${interaction.user.tag}\nสร้างเมื่อ: <t:${Math.floor(interaction.user.createdTimestamp/1000)}:F>\nเข้าร่วมเซิฟเวอร์เมื่อ: <t:${Math.floor(interaction.member.joinedTimestamp/1000)}:F>`,
                            color : 16777215
                        }],
                        ephemeral: true}
                )
            }
        }
        
        // ส่งคำสั่ง server เพื่อดูข้อมูล server
        else if (interaction.commandName == "server") {
            await interaction.reply(
                { content: `ชื่อ : ${interaction.guild.name}\nสร้างเมื่อ : <t:${Math.floor(interaction.guild.createdTimestamp/1000)}:F>`,
                ephemeral: true}
            )
        }
    
        // ส่งคำสั่ง botinfo เพื่อดูข้อมูล bot
        else if (interaction.commandName == "bot") {
            await interaction.reply(
                { content: `บอทชื่อ : ${interaction.client.user.tag}\nสร้างเมื่อ : <t:${Math.floor(interaction.client.user.createdTimestamp/1000)}:F>\nผู้สร้าง : Moskuza#5798`,
                ephemeral : true }
            )
        }
    
        // ส่งคำสั่ง remove เพื่อลบข้อความตามจำนวนที่ระบุ
        else if (interaction.commandName == "remove") {
            const message_count = interaction.options.getNumber("count")
            if (message_count) {
                if (message_count > 0 && message_count <= 50) {
                    await interaction.channel.bulkDelete(message_count, true)
                    interaction.reply(
                        { content: `${interaction.client.user.username} ได้ลบ ${message_count} ข้อความเรียบร้อยแล้ว`}
                    )
                    await sleep(5000)
                    await interaction.channel.lastMessage.delete()
                }
                else interaction.channel.send("คุณไม่สามารถลบข้อความได้เนื่องจากคุณลบข้อความเกิน 50 ข้อความ")
            }
            else {
                await interaction.reply(
                    { content: "ไม่สามารถลบข้อความได้เนื่องจากคุณยังไม่ระบุจำนวนข้อความ"}
                )
            }
        }
    }
}

// ฟังก์ชั่น
function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }