const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue } = require('../services/queueService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('View the current song queue.'),
    async execute(interaction) {
        const queue = getQueue(interaction.guild.id);

        if (!queue || queue.songs.length === 0) {
            return interaction.reply('The queue is currently empty.');
        }

        const queueList = queue.songs.map((song, index) => {
            return `${index + 1}. ${song.title} - Requested by ${song.requestedBy}`;
        }).join('\n');

        await interaction.reply(`Current Queue:\n${queueList}`);
    },
};