const client = require("../app.js");
const { Collection, ChannelType } = require("discord.js");
const VoiceManager = new Collection();


client.on('voiceStateUpdate', async (oldState, newState) => {
    const { member, guild} = oldState;
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;
    const TemporaryId = '1052566819858288671';

    // เมื่อมีคนเข้า
    if (!oldChannel && newChannel.id === TemporaryId) {
        const VoiceChennel = await guild.channels.create({
            name: `┗ห้องของคุณ ${member.user.username}`, // ชื่อของห้องที่ต้องการใช้
            type: ChannelType.GuildVoice,
            parent: newChannel.parent,
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ['Connect', 'ManageChannels']
                },
                {
                    id: guild.id,
                    allow: ['Connect', 'ManageChannels']
                }
            ]
        });

        VoiceManager.set(member.id, VoiceChennel.id); // Collection Set <K, V>

        await newChannel.permissionOverwrites.edit(member, {Connect: false});
        setTimeout(() => {
            newChannel.permissionOverwrites.delete(member)
        }, 30 * 1000);

        return setTimeout(() => {
            member.voice.setChannel(VoiceChennel);
        }, 500);
    }

    // เมื่อมีคนออกหรือเปลี่ยนห้อง
    const leaveRoom = VoiceManager.get(member.id)
    if (leaveRoom && 
        oldChannel.id === leaveRoom && 
        (!newChannel || newChannel.id !== leaveRoom)
    ) {
        VoiceManager.set(member.id, null);
        oldChannel.delete().catch((e) => null);
    }
})