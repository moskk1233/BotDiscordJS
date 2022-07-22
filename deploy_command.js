const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10")
require("dotenv").config()

const commands = [
    new SlashCommandBuilder().setName("ping")
    .setDescription("Reply Pong!"),

    new SlashCommandBuilder().setName("user")
    .setDescription("Reply User Information")
    .addUserOption(option => 
        option.setName("user")
            .setDescription("Select user to show Information.")
    ),

    new SlashCommandBuilder().setName("server")
    .setDescription("Reply Server Information"),

    new SlashCommandBuilder().setName("bot")
    .setDescription("Bot Information"),

    new SlashCommandBuilder().setName("remove")
    .setDescription("Remove Messages past 14 days")
    .addNumberOption(number => 
        number.setName("count")
        .setDescription("Count Messages to remove")
        .setRequired(true)
        )
].map(command => command.toJSON())

const rest = new REST({ version: "10"}).setToken(process.env.TOKEN)

function PutCommand() {
    console.log("กำลังทำการอัพโหลดคอมมานด์(/)")
    rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
    .then(() => console.log("อัพโหลดคอมมานด์(/)สำเค็จ"))
    .catch(console.error)
}
PutCommand()