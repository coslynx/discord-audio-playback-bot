const { Events } = require('discord.js');
const { getQueue } = require('../services/queueService');
const { playSong } = require('../services/musicService');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        const guildId = member.guild.id;
        const queue = getQueue(guildId);

        // Welcome the new member
        const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
        if (welcomeChannel) {
            welcomeChannel.send(`Welcome to the server, ${member.displayName}! Enjoy your stay!`);

            // Check if there is an active music queue and start playing if it’s the first member
            if (queue && queue.songs.length > 0) {
                try {
                    await playSong(guildId);
                } catch (error) {
                    console.error('Error playing song for new member:', error);
                }
            }
        } else {
            console.warn('No welcome channel found in the guild:', guildId);
        }
    },
};