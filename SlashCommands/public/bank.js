module.exports = {
  name: "bank",
  description: "See your money",
  run: async(client, interaction) => {

    const userDatabase = await client.userDB.findOne({ _id: interaction.user.id }) || await client.userDB.create({ _id: interaction.user.id });

    await interaction.reply({
      content: `> **Money:** \`${userDatabase.money}\`$`,
      ephemeral: true
    });

  }
}