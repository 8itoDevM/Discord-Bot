const { SlashCommandBuilder } = require('discord.js')
const { execute } = require('./ping')

module.exports = {
    data: new SlashCommandBuilder().setName('six').setDescription('returns a misterious 2 digit number'),
    async execute(interaction){
        await interaction.reply('67');
    }
}