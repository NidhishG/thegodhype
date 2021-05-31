const { DiscordBattleShip } = require('discord-battleship');
const BattleShip = new DiscordBattleShip({
    embedColor: "RANDOM", /* Any Discord.js Color Resolvable will work. */
    prefix: "a!", /* This is the prefix that will be used in the users DM's for commands. 
                    You can set this to any string. */
});

module.exports = {
    config:{
  name: 'battleship',
  usage: '[USER TO BATTLE WITH]',
  category: 'games',
  description: 'play basic battleship board game using [discord-battleship](https://npmjs/package/discord-battleship)',
    },
  run: async (bot, message, args) => {
    if (message.mentions.users.first().bot) return message.reply("Bots Can't Play Games Like This!")
    await BattleShip.createGame(message);
  }
}