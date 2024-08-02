const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        // Set bot's activity status
        client.user.setActivity('Music | /help', { type: 'LISTENING' });

        // Initialize any configurations, databases, or other needed resources
        try {
            await client.db.connect(); // Example connection to a database, replace with actual implementation
            console.log('Database connected successfully.');
        } catch (error) {
            console.error('Error connecting to the database:', error);
        }
        
        // Optionally, load commands and other event listeners if not done elsewhere
        const commandFiles = await getCommandFiles(); // Assume a function to fetch command file names
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            client.commands.set(command.data.name, command);
            console.log(`Command loaded: ${command.data.name}`);
        }
    },
};

// Mock function for loading command files (replace with actual implementation)
async function getCommandFiles() {
    return ['play.js', 'pause.js', 'skip.js', 'stop.js', 'help.js', 'queue.js', 'search.js']; // List command file names
}