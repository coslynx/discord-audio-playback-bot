const { SlashCommandBuilder } = require('@discordjs/builders');
const { searchVideo } = require('../services/musicService');
const { getQueue, addToQueue } = require('../services/queueService');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Search for a song on YouTube and adds it to the queue.')
        .addStringOption(option => 
            option.setName('query')
                .setDescription('The name of the song to search for')
                .setRequired(true)),
    async execute(interaction) {
        const query = interaction.options.getString('query');
        await interaction.deferReply();

        try {
            const video = await searchVideo(query);
            if (!video) {
                return interaction.editReply('No results found for your query.');
            }

            const queue = getQueue(interaction.guild.id);
            await addToQueue(queue, video);
            return interaction.editReply(`Added to queue: ${video.title}`);
        } catch (error) {
            console.error('Error searching for video:', error);
            return interaction.editReply('There was an error while searching for the song. Please try again later.');
        }
    },
};