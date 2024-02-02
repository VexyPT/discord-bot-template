module.exports = {
  name: "bank",
  description: "See your money",
  run: async(client, message) => {

    const userDatabase = await client.userDB.findOne({ _id: message.user.id }) || await client.userDB.create({ _id: message.user.id });

    await message.reply({
      content: `> **Money:** \`${userDatabase.money}\`$`,
      ephemeral: true
    });

  }
}