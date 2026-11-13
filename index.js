const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, (readyClient) => {
    console.log(`${readyClient.user.tag} is ready and logged in!`);
});

client.login(token);