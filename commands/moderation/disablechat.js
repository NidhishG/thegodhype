const db = require('quick.db')
const Discord = require(`discord.js`)
require('discord-inline-replys')
module.exports = {
    config:{
        name: 'disablechat',
        aliases: ['disablechatbot'],
        description: 'disable a channel for the chat bot'
    },
    async run(bot, message, args){
        if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.reply(`You dont have enough perms`)
   let a = db.fetch(`chatbot_${message.guild.id}`)
   if(!a) return message.mentionReply(`chat bot is already disabled!`)
   else{
        
             db.delete(`chatbot_${message.guild.id}`)
             message.noMentionReply(`Chat bot has been removed!`)
   }
    }
}