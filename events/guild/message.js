const db = require('quick.db');
const { PREFIX } = require('../../config.js');
const { config } = require(`../../handler/command`)
const queue2 = new Map();
const queue3 = new Map();
const queue = new Map();
const games = new Map()
const fetch = require(`node-fetch`).default

module.exports = async (bot, message) => {
    try {
        if (message.author.bot || message.channel.type === "dm") 
          return;

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();

        if (!message.content.startsWith(prefix)) return;
let color = 'ff0000'
        let ops = {
            queue: queue,
            queue2: queue2,
            queue3: queue3,
            games: games
        }
        /*
        let commandFetch = db.fetch(`commandToggle_${message.guild.id}`)
        if(commandFetch == null) commandFetch = []
        if(commandFetch.includes(bot.commands.config.name)) return message.channel.send("This command is disabled")
    */
        var commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
        if (commandfile) commandfile.run(bot, message, args, ops, color);
    } catch (error) {
        console.log(error);
    }
}