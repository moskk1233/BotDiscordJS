// เรียกใช้โมดูล
const { Client, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

// ประกาศตัวแปรคำสั่งบอท
const client = new Client({ intents: GatewayIntentBits.Guilds })


// ทำงานเมื่อเริ่มต้น
client.on("ready", () => {
    console.log(`เปิดใช้งานบอท ${client.user.tag}`)
    client
})

// ทำงานเพื่อมี Event interactionCreate
client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return

    // ส่งคำสั่ง ping
    if (interaction.commandName == "ping"){
        await interaction.reply('pong')
    }

    // ส่งคำสั่ง user เพื่อดูข้อมูล user
    else if (interaction.commandName == "user") {
        const getUserInfo = interaction.options.getUser("user")
        if (!getUserInfo) {
            interaction.reply(
                await interaction.reply(
                    { content: `ชื่อ : ${interaction.user.tag}\nสร้างเมื่อ : <t:${interaction.user.createdTimestamp/1000}:F>`,
                    ephemeral: true}
                )
            )
        }
        else {
            await interaction.reply(
                { content: `ชื่อ : ${getUserInfo.tag}\nสร้างเมื่อ : <t:${Math.floor(getUserInfo.createdTimestamp/1000)}:F>`,
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
    else if (interaction.commandName == "botinfo") {
        await interaction.reply(
            { content: `บอทชื่อ : ${client.user.tag}\nสร้างเมื่อ : <t:${Math.floor(client.user.createdTimestamp/1000)}:F>`,
            ephemeral : true }
        )
    }
})

// ฟังก์ชั่นต่างๆ

// สั่งเริ่มบอทดิสคอร์ด
client.login(process.env.TOKEN)