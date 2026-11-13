const { SlashCommandBuilder } = require('discord.js');
const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder().setName('user').setDescription('Shows user information.'),
    async execute(interaction) {
        await interaction.reply(
            `User command was ran by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
        );
    },
};