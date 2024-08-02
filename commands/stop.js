const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue } = require('../services/queueService');
const { stopSong } = require('../services/musicService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the music and clear the queue.'),
    
    async execute(interaction) {
        const queue = getQueue(interaction.guild.id);
        
        if (!queue || queue.songs.length === 0) {
            return interaction.reply('There is no music playing right now.');
        }

        try {
            await stopSong(interaction.guild.id);
            await interaction.reply('Stopped the music and cleared the queue.');
        } catch (error) {
            console.error('Error stopping the music:', error);
            await interaction.reply('There was an error while trying to stop the music. Please try again later.');
        }
    },
};