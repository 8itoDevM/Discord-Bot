const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, MessageFlags, InteractionResponse } = require('discord.js');
const { token } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is ready and logged in!`);
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandsFolders = fs.readdirSync(foldersPath);

for (const folder of commandsFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
    for(const file of commandsFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        if('data' in command && 'execute' in command){
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property`)
        }
    }
}

client.on(Events.InteractionCreate, async (interaction) =>{
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
    }

    try{
        await command.execute(interaction);
    } catch(error){
        console.error(error);
        if (interaction.replied || Interaction.deferred) {
            await interaction.followUp({
                content: 'There was an error while executing this command!',
                flgas: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'There was an error while executing this command',
                flgas: MessageFlags.Ephemeral,
            });
        }
    }
});

client.login(token);