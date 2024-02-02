const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.username} Online`);

    client.user.setActivity({
      name: "customstatus",
      type: ActivityType.Custom,
      state: "Made with ❤️ by Vexy"
    });

  }
}