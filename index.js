const mongoose = require("mongoose");
const { Client, Collection, Partials, GatewayIntentBits, WebhookClient, EmbedBuilder } = require("discord.js");
const handler = require("./handler/index.js");
require('dotenv').config();
const client = new Client({
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false
        },
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildModeration,
            GatewayIntentBits.GuildEmojisAndStickers,
            GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks,
            GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions,
            GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.MessageContent,
        ],
        partials: [
            Partials.Channel,
            Partials.Message,
            Partials.Reaction,
        ],
});

module.exports = client;

client.userDB = require("./schemas/User.js");
client.commands = new Collection();
client.slash = new Collection();
client.config = require('./config.json');

handler.loadEvents(client);
handler.loadCommands(client);
handler.loadSlashCommands(client);

// Webhook command logs
const webhookUrl = ''; // WebHook URL
const webhookClient = new WebhookClient({ url: webhookUrl });

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

// Commands args
  const args = interaction.options._hoistedOptions.map((option) => {
    return `${option.name}: ${option.value}`;
  });

  let logMessage = new EmbedBuilder()
  .setColor("Grey")
  .setTitle("🛡️ Commands Logs:")
  .setDescription(`> 🛰️ **Command:** \`${interaction.commandName}\`
  > 👤 **Run by:** \`${interaction.user.tag}\` - \`${interaction.user.id}\`
  > 🗺️ **Server:** \`${interaction.guild.name}\`
  > 💡 **Args:**  \`${args.join(' | ')}\``)

  webhookClient.send({ embeds: [logMessage] });
});
// -------------------------------------

process.on("uncaughtException", (err) => {
	console.log("Error: Uncaught Exception:\n" + err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.log("Error: unhandledRejection\n" + promise + "\nreason:\n" + reason.message);
});

// Login
client.login(process.env.clientToken);

// MongoDB Connection
mongoose.connect(process.env.mongodbToken)
  .then(() => { console.log("MongoDB Connected") })