const Discord = require("discord.js");
const randomstring = require("randomstring");
const db = require('quick.db');
const { run } = require("../ticket/setreactionticket");

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor('#ff0000')

const embed2 = new Discord.MessageEmbed()
    .setTitle('**Invalid Usage**')
    .setColor('#ff0000')
    .setDescription(`\`\`\`baninfo <ban id>\`\`\``)
    
const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `BAN_MEMBERS` permission')
    .setColor('#ff0000')

module.exports = {
    config:{
    name: 'warninfo',
    description: "warninfo <ban id>",
    },
    async run(bot, message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedd)

        const id = args[0]

        if(!args[0]) return message.channel.send(embed2)

        const info = db.get(`warn_${id}`)

        const embed = new Discord.MessageEmbed()
        .setTitle(`Warn Info for: \`${id}\``)
        .setDescription(`${info}`)
        .setFooter(`Requsted by: ${message.author.username}`)
        .setTimestamp()
        .setColor('ff0000')

        if (!message.member.permissions.has("BAN_MEMBERS")) {
            return message.channel.send(embed3);
        } else {
            message.channel.send(embed)
        }
    }

}