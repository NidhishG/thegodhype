const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const ms = require("parse-ms");

module.exports = {
   config:{
        name: "beg",
        category: "economy",
        description: "Work to Earn Money",
        usage: " ",
        accessableby: "everyone",
   },
    run: async (bot, message, args) => {

        let user = message.author;
        let author = await db.fetch(`beg_${user.id}`)

        let timeout = 900000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new MessageEmbed()
                .setColor("RED")
                .setDescription(`❌ You have already begged recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.channel.send(timeEmbed)
        } else {
            let amount = Math.floor(Math.random() * 1500) + 1;
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ **You begged and some nice person gave ${amount}**`)
            message.channel.send(embed1)

            db.add(`beg_${user.id}`, 1)
            db.add(`money_${user.id}`, amount)
            db.set(`beg_${user.id}`, Date.now())
        };
    }
} 