const fs = require("node:fs")
const path = require("node:path")
const { Client, GatewayIntentBits, ActivityType, Collection } = require("discord.js")
require('dotenv').config()
const { error_msg, color } = require("./config.json")

const client = new Client({ intents: [GatewayIntentBits.GuildMessages,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent,
	GatewayIntentBits.GuildVoiceStates
]})

module.exports = client;

client.commands = new Collection

/* ค้นหาไฟล์ command-handler */
const commandsPath = path.join(__dirname, "command_handler")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    client.commands.set(command.data.name, command)
}

/* ใช้คำสั่งทำงาน */
client.once('ready',() => {
	console.log(`เปิดใช้งานบอท ${client.user.tag}`)
	client.user.setActivity({ name: "Yaho~", type: ActivityType.Watching })
})

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand()) return

	const command = client.commands.get(interaction.commandName)
	if (!command) return

	try {
		await command.execute(interaction)
	} catch(err) {
		console.log(err)
		await interaction.reply({
			embeds: [{
				description: `${error_msg[1]}`,
				color: Number(color.error)
			}]
		})
	}
})

/* Events */
try {
	const eventfiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))
	eventfiles.forEach(file => require(`${__dirname}/events/${file}`))
}
catch(err) {
	console.log(err)
}
/* ทำงานคำสั่งสร้าง SlashCommand */
require("./deploy_command");

/* เริ่มต้นบอท */
client.login(process.env.TOKEN);