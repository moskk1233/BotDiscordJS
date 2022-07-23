module.exports = {
    name : "messageCreate",
    async execute(message) {
        if (message.author.bot) return
        message.delete()
        await message.channel.send(`**${message.author.tag}**: ${message.content}`)
    }
}