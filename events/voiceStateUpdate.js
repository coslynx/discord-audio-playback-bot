const { Events } = require('discord.js');
const { getQueue } = require('../services/queueService');
const { stopSong } = require('../services/musicService');

module.exports = {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const guildId = newState.guild.id;
        const queue = getQueue(guildId);

        // If a user leaves the voice channel
        if (oldState.channelId && !newState.channelId) {
            // Check if the bot is still in the voice channel
            const channel = oldState.guild.channels.cache.get(oldState.channelId);
            if (channel && channel.members.size === 1) {
                // If there are no users left, stop the music and clear the queue
                try {
                    await stopSong(guildId);
                    console.log(`Stopped the music in ${guildId} as the last user left the voice channel.`);
                } catch (error) {
                    console.error('Error stopping the song after the last member left:', error);
                }
            }
        }

        // If a user joins a voice channel and the bot is not in a voice channel
        if (!oldState.channelId && newState.channelId) {
            console.log(`User joined a voice channel: ${newState.channelId}`);
            // You may include logic for what happens when a user joins, 
            // for example, automatically joining a voice channel if certain criteria are met.
        }
    },
};