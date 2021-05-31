const db = require('quick.db');
const Discord = require(`discord.js`)
const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor('#ff0000')

module.exports = {
    config:{
    name: "warnings",
    description: "Check a users warnings",
    
    },
    async run(bot, message, args){
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(embed3)


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) warnings = 0;
        const embed = new Discord.MessageEmbed()
        .setTitle(`${user.username}'s Warning(s)`)
        .setColor(`ff0000`)
        .setDescription(`**${user.username}** has \`${warnings}\` warning(s)`)
        .setFooter(`Requested By ${message.author.username}`)

        message.channel.send(embed);
    }
}