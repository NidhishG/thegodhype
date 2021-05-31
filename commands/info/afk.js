require(`discord-inline-replys`)
const { MessageEmbed } = require(`discord.js`)
module.exports = {
    config: {
        name: "afk",
        aliases: ['setafk'],
        category: "info",
        description: "Sets afk for a user",
        usage: "afk <reason>",
   },
   async run(bot, message, args, Discord){
    const discord = require('discord.js')
    const db = require('quick.db')
    
    
    
        let content = args.join(" ")
        if(!content) return message.mentionReply(`Please specify a reason to be AFK!`)
        await db.set(`afk_${message.author.id}+${message.guild.id}`, content)
        const embed = new MessageEmbed()
        .setColor(`ff0000`)
        .setTitle(`AFK Set 😴`)
        .setDescription(`You are now AFK \n **Reason:** ${content}`)
        .setTimestamp()
        message.noMentionReply(embed)
        
    }
}