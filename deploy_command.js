const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
require("dotenv").config()

module.exports = {
    rest: new REST({ version: "10" }).setToken(process.env.TOKEN),
    commands: [
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
        .addNumberOption(number => number.setName("count")
            .setDescription("จำนวนข้อความที่ต้องการลบ")
            .setRequired(true)
        ),

        new SlashCommandBuilder().setName("play")
        .setDescription("เล่นเพลง")
        .addSubcommand(subcommand => subcommand
            .setName("song")
            .setDescription("เล่นเพลงที่ต้องการ")
            .addStringOption(string => string
                .setName("url")
                .setDescription("ใส่ลิงค์เพลง")
                .setRequired(true)
            )
        )
    ].map(command => command.toJSON()),

    putCommand() {
        console.log(`+-------------------+---+\n| Command Uploading |   |\n+-------------------+---+`)
        this.rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: this.commands })
        .then(() => {
            console.log(`+-------------------+---+\n| Command Uploading | ✓ |\n+-------------------+---+\n`)
        })
        .catch(console.error)
    }
}