const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
require("dotenv").config()

const commands = [
    new SlashCommandBuilder().setName("ping")
    .setDescription("ตรวจสอบบทว่าทำงานได้ปกติหรือไม่"),

    new SlashCommandBuilder().setName("user")
    .setDescription("ดูรายละเอียดของผู้ใช้งาน")
    .addUserOption(option => 
        option.setName("user")
            .setDescription("เลือกผู้ใช้งานที่ต้องการดูรายละเอียด")
    ),

    new SlashCommandBuilder().setName("server")
    .setDescription("ดูรายละเอียดของเซิฟเวอร์"),

    new SlashCommandBuilder().setName("bot")
    .setDescription("ดูรายละเอียดของบอท"),

    new SlashCommandBuilder().setName("remove")
    .setDescription("ลบข้อความใน 14 วันที่ผ่านมา")
    .addNumberOption(number => 
        number.setName("count")
        .setDescription("จำนวนข้อความที่ต้องการลบ")
        .setRequired(true)
        )
].map(command => command.toJSON())

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN)

function PutCommand() {
    console.log(`+-------------------+---+\n| Command Uploading |   |\n+-------------------+---+`)
    rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
    .then(() => {
        console.log(`+-------------------+---+\n| Command Uploading | ✓ |\n+-------------------+---+\n`)
    })
    .catch(console.error)
}
PutCommand()