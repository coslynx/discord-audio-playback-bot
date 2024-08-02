const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Provides a list of commands and their usage.'),
    async execute(interaction) {
        const commandsList = [
            {
                name: 'play',
                description: 'Play a song from a specified URL or search for a song.'
            },
            {
                name: 'skip',
                description: 'Skip the currently playing song.'
            },
            {
                name: 'stop',
                description: 'Stop the music and clear the queue.'
            },
            {
                name: 'queue',
                description: 'View the current song queue.'
            },
            {
                name: 'search',
                description: 'Search for a song on YouTube and adds it to the queue.'
            },
            {
                name: 'help',
                description: 'Displays this help message.'
            },
        ];

        const commandDescriptions = commandsList.map(cmd => `/${cmd.name}: ${cmd.description}`).join('\n');

        const helpMessage = `Here are the available commands:\n${commandDescriptions}`;

        await interaction.reply(helpMessage);
    },
};