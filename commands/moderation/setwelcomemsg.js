const db = require("quick.db");

module.exports = {
  config: {
    name: "setwelcomemsg",
    category: "moderation",
    description: "Sets A Channel Where The Bot Can Welcome Users!",
    usage: "[channel mention | channel ID | channel name]",
    accessableby: "Administrators"
  },
  run: async (bot, message, args) => {
    const Discord = require("discord.js");
    const db = require(`quick.db`)
    
    const embed = new Discord.MessageEmbed()
        .setTitle('**❌ INVALID USAGE**')
        .setColor('ff0000')
        .setDescription(`\`\`\`welcome <channel> <message>\`\`\``)
    
    const embed3 = new Discord.MessageEmbed()
        .setTitle('you are missing the `MANAGE_CHANNELS` permission')
        .setColor('ff0000')
    
            if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.inlineReply(embed3)
            const channel = message.mentions.channels.first();
            const msg = args.slice(1).join(' ');
    
            if (!args[0]) return message.channel.send(embed)
             if(!msg) return message.channel.send(embed)
            if (channel, msg) {
    
                if (!args[1]) return message.inlineReply(embed)
    
                db.set(`welcome_${message.guild.id}`, channel.id)
                db.set(`welcomemsg_${message.guild.id}`, msg)
    
                const em1 = new Discord.MessageEmbed()
                    .setDescription(`⚙️ working...`)
                    .setColor('ff0000')
    
                const em2 = new Discord.MessageEmbed()
                    .setDescription(`✅ <@${message.author.id}> | welcome channel set to: <#${channel.id}> message: **@member, ${msg}**`)
                    .setColor('ff0000')
    
                const msgss = await message.channel.send(em1)
    
                setTimeout(() => msgss.edit(em2), 3000)
            } else if (args[0] === 'off') {
    
                db.delete(`welcome_${message.guild.id}`)
                db.delete(`welcomemsg_${message.guild.id}`)
    
                const em3 = new Discord.MessageEmbed()
                    .setDescription(`⚙️ working...`)
                    .setColor('ff0000')
    
                const em4 = new Discord.MessageEmbed()
                    .setDescription(`✅ <@${message.author.id}> | welcome message is now deleted`)
                    .setColor('ff0000')
    
                const msgs = await message.channel.send(em3)
    
                setTimeout(() => msgs.edit(em4), 3000)
            }
        }
      }
    
  