const { Events } = require('discord.js');
const { getQueue } = require('../services/queueService');
const { addToQueue } = require('../services/musicService');
const ytSearch = require('yt-search');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        // Ignore bot messages
        if (message.author.bot) return;

        const args = message.content.split(' ').slice(1);
        const command = message.content.split(' ')[0].toLowerCase();

        if (command === '!play') {
            const input = args.join(' ');
            const queue = getQueue(message.guild.id);

            if (!queue) {
                return message.channel.send('There is no active queue. Please start by adding a song.');
            }

            let songInfo;
            try {
                if (input.startsWith('http')) {
                    songInfo = await validateAndFetchSong(input);
                } else {
                    const searchResult = await ytSearch(input);
                    if (searchResult.videos.length === 0) {
                        return message.channel.send('No results found for your query.');
                    }
                    songInfo = searchResult.videos[0];
                }

                const song = {
                    title: songInfo.title,
                    url: songInfo.url,
                    requestedBy: message.author.username
                };

                await addToQueue(queue, song);
                return message.channel.send(`Added to the queue: ${song.title}`);
            } catch (error) {
                console.error('Error during play command execution:', error);
                return message.channel.send('There was an error while trying to play the song. Please try again later.');
            }
        }
    },
};

async function validateAndFetchSong(url) {
    const isValidUrl = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\S+/.test(url);
    if (!isValidUrl) {
        throw new Error('Invalid song URL.');
    }

    return {
        title: 'Sample Song from URL', 
        url: url
    };
}