const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue } = require('../services/queueService');
const { skipSong } = require('../services/musicService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the currently playing song.'),
    
    async execute(interaction) {
        const queue = getQueue(interaction.guild.id);

        if (!queue || queue.songs.length === 0) {
            return interaction.reply('There is no song currently playing to skip.');
        }

        try {
            await skipSong(interaction.guild.id);
            await interaction.reply('Skipped the current song.');
        } catch (error) {
            console.error('Error skipping the song:', error);
            await interaction.reply('There was an error while trying to skip the song. Please try again later.');
        }
    },
};