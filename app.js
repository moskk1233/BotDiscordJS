const fs = require("node:fs")
const path = require("node:path")
const { Client, GatewayIntentBits } = require("discord.js")
require("dotenv").config()

const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent]})

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// ใช้คำสั่งทำงาน
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// เริ่มต้นบอท
client.login(process.env.TOKEN)