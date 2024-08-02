const { Permissions } = require('discord.js');

// Function to check if the user has permission to execute a command
function hasPermission(interaction, requiredPermission) {
    const member = interaction.member;

    // Check if the member has the required permission
    if (!member.permissions.has(requiredPermission)) {
        throw new Error(`You do not have the required permission: ${requiredPermission}`);
    }
}

// Function to check permissions for various bot commands
function checkBotPermissions(interaction, requiredPermissions) {
    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);
    
    const missingPermissions = requiredPermissions.filter(permission => !botMember.permissions.has(permission));

    if (missingPermissions.length > 0) {
        throw new Error(`Bot is missing the following permissions: ${missingPermissions.join(', ')}`);
    }
}

// Function to validate user roles for command permissions
function validateUserRole(interaction, allowedRoles) {
    const memberRoles = interaction.member.roles.cache;

    const hasRole = allowedRoles.some(role => memberRoles.has(role));

    if (!hasRole) {
        throw new Error('You do not have the required role to perform this action.');
    }
}

// Public API of the permissionService
module.exports = {
    hasPermission,
    checkBotPermissions,
    validateUserRole
};