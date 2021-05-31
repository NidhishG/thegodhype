// Required: Otherwise you will get Discord / MessageEmbed is not defined
const Discord = require("discord.js");
const { MessageEmbed, DiscordAPIError } = require("discord.js");

// Your Handler here:
// Category: "FUN"
module.exports = {
    config:{
    name: "f",
    description: "f command - inc. MessageEmbed",
    },
    run(bot, message, args) {


    
        if (!args[0]) {
            message.delete().catch(() => {});
            const embed = new Discord.MessageEmbed()
             .setAuthor(`${message.author.username} has paid their respects`)
             .setColor("RANDOM")
            .setFooter('Press 🇫 to pay your respects') // You can change the emoji here to an custom one.
            message.channel.send(embed).then(m => m.react("🇫")).catch(() => { });


        }

        else {
            message.delete().cache(() => {
                const embed = new Discord.MessageEmbed()
                .setAuthor('\u2000', message.author.displayAvatarURL({ format: 'png' }))
                .setColor('PURPLE')
                 message.channel.send(embed).then(m => m.react("🇫")).catch(() => {});
            })
        }


    }
};