const { Interaction } = require('discord.js');
const { logger } = require('./logger');
const { handleError } = require('./errorHandler');
const { hasPermission, checkBotPermissions } = require('./permissionsHandler');

async function handleCommand(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        await interaction.reply({ content: 'Command not found.', ephemeral: true });
        return;
    }

    try {
        const requiredPermissions = command.requiredPermissions || [];
        checkBotPermissions(interaction, requiredPermissions);
        await command.execute(interaction);
    } catch (error) {
        logger.error(`Error executing command: ${interaction.commandName} - ${error.message}`);
        handleError(interaction, error);
    }
}

async function handleMessageCommand(message) {
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = message.client.commands.get(commandName);

    if (!command) {
        message.channel.send('Command not recognized.');
        return;
    }

    try {
        await command.execute(message, args);
    } catch (error) {
        logger.error(`Error executing command: ${commandName} - ${error.message}`);
        message.channel.send('There was an error executing that command.');
    }
}

module.exports = {
    handleCommand,
    handleMessageCommand
};