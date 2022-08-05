const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
const fs = require("node:fs")
const path = require("node:path")
require("dotenv").config()


const commands = []
const commandPath = path.join(__dirname, "command_handler")
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"))

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file)
    const slashcommand = require(filePath)
    commands.push(slashcommand.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
console.log(`+-------------------+---+\n| Command Uploading |   |\n+-------------------+---+`)
rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
.then(() => {
    console.log(`+-------------------+---+\n| Command Uploading | ✓ |\n+-------------------+---+\n`)
})
.catch(console.error)