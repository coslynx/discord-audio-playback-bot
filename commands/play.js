const { SlashCommandBuilder } = require('@discordjs/builders');
const { getQueue, addToQueue } = require('../services/queueService');
const { playSong } = require('../services/musicService');
const ytSearch = require('yt-search');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play a song from a specified URL or search for a song.')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('URL or title of the song to play')
                .setRequired(true)),
    
    async execute(interaction) {
        const input = interaction.options.getString('input');
        await interaction.deferReply();

        const queue = getQueue(interaction.guild.id);
        
        if (!queue) {
            interaction.reply('There is no active queue. Please start by adding a song.');
            return;
        }

        let songInfo;
        try {
            if (input.startsWith('http')) {
                // URL provided, retrieve song info
                songInfo = await validateAndFetchSong(input);
            } else {
                // Search for the song
                const searchResult = await ytSearch(input);
                if (searchResult.videos.length > 0) {
                    songInfo = searchResult.videos[0];
                } else {
                    interaction.editReply('No results found for your query.');
                    return;
                }
            }

            const song = {
                title: songInfo.title,
                url: songInfo.url,
                requestedBy: interaction.user.username
            };

            await addToQueue(queue, song);
            await interaction.editReply(`Added to the queue: ${song.title}`);
            playSong(interaction.guild.id); // Start playing if now is the first song.
        } catch (error) {
            console.error('Error during song play execution:', error);
            await interaction.editReply('There was an error while trying to play the song. Please try again later.');
        }
    },
};

async function validateAndFetchSong(url) {
    // Dummy function to retrieve song details from a given URL
    // In real implementation, you might want to validate the URL and retrieve from specific sources
    const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\S+/.test(url);
    if (!isValidUrl) {
        throw new Error('Invalid song URL.');
    }
    
    // Assuming we just return a mock object, implement actual fetching logic here
    return {
        title: 'Sample Song from URL',  // replace with an API call for song metadata
        url: url
    };
}