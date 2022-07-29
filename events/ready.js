const { ActivityType } = require("discord.js")
module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`เปิดใช้งานบอท ${client.user.tag}`)
        client.user.setActivity({ name: "Yaho~", type: ActivityType.Watching})
    }
}