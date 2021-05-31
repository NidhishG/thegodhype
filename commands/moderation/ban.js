  
const Discord = require("discord.js");
const randomstring = require("randomstring");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**Invalid Usage**')
.setColor('#ff0000')
.setDescription(`ban <@user> <reason>`)

const embed3 = new Discord.MessageEmbed()
    .setTitle('you are missing the `BAN_MEMBERS` permission')
    .setColor('#ff0000')

const embedd = new Discord.MessageEmbed()
    .setTitle('i am missing the `BAN_MEMBERS` permission')
    .setColor('ff0000')

const embeddd = new Discord.MessageEmbed()
    .setTitle('sorry, i cant ban that user they are a higher role than me!')
    .setColor('#ff0000')

module.exports = {
    config:{
    name: 'ban',
    aliases: ['yeet'],
    description: "ban <@user> <reason>",
    },
    async run(bot, message, args) {
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embedd)

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embed3)

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    
          

            if(target === message.author) return message.channel.send('you cant ban yourself idiot :face_palm:')

            const bruh = randomstring.generate(7);

            let prefix = db.get(`prefix_${message.guild.id}`);
            if (prefix === null) prefix = 'a!'

            let reason = args.slice(1).join(' ');
            if(!reason) reason = 'none'

            if (!args[0]) return message.channel.send(embed)

            if (target) {

                const memberTarget = message.guild.members.cache.get(target.id);

                if(memberTarget === '706192191198068778') return message.channel.send('your really trying to ban the person who created me?')

                if(!memberTarget.bannable) return message.channel.send(embeddd)

                memberTarget.ban({ reason: reason });

                const embed4 = new Discord.MessageEmbed()
                    .setTitle(`A user has been banned`)
                    .setDescription(`[USER BANNED](${message.url})`)
                    .addField('REASON:', `\n${reason}`)
                    .addField('BANNED BY:', `\n${message.author.tag}`)
                    .addField('BAN ID:', `\n \`${bruh}\``)
                    .setTimestamp()
                    .setColor('#ff0000')

                const embed5 = new Discord.MessageEmbed()
                    .setTitle(`you have been banned from: ${message.guild.name}`)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .addField('REASON:', `\n${reason}`)
                    .addField('BANNED BY:', `\n${message.author.tag}`)
                    .addField('BAN ID:', `\n \`${bruh}\``)
                    .setTimestamp()
                    .setColor('#ff0000')

                db.set(`ban_${bruh}`, `[MESSAGE LINK](${message.url})\n**REASON:** ${reason}**BANNED BY:** ${message.author.tag}`)

                db.add(`casenumbers_${message.guild.id}`, 1)

                target.send(embed5)

                message.channel.send(embed4)

                const channell = db.get(`modlogs_${message.guild.id}`)

                const channel = message.guild.channels.cache.get(channell);

                if (!channel) return;
    
                channel.send(embed4)
            } else {
                message.channel.send('couldnt ban that user');

            }
        
    }

}