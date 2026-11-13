const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder().setName('ping').setDescription("Answers with pong!"),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};