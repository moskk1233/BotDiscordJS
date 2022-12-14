const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v10");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const ascii = require("ascii-table");
let table = new ascii("Commands")
    .setHeading("Command", "Deploy Status");


const commands = [];
const commandPath = path.join(__dirname, "command_handler");
const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const slashcommand = require(filePath);
    try {
        commands.push(slashcommand.data.toJSON());
        table.addRow(file, "✅ All Pass!!");
    }
    catch {
        table.addRow(file, "❌ --> Insert data.SlashCommandBuilder in This file");
    }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands });
console.log(table.toString())