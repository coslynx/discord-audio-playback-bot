const { EmbedBuilder } = require('discord.js');

function handleError(interaction, error) {
    console.error('Error occurred:', error);

    const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('An Error Occurred!')
        .setDescription('Something went wrong while processing your request. Please try again later or contact an administrator for help.')
        .addFields(
            { name: 'Error Message', value: error.message || 'Unknown error', inline: true },
            { name: 'Please report this issue to a moderator.', value: 'Your feedback helps us improve!' }
        )
        .setTimestamp();

    interaction.reply({ embeds: [embed], ephemeral: true });
}

module.exports = { handleError };