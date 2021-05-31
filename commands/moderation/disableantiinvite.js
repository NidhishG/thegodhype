const db = require('quick.db')
const Discord = require(`discord.js`)
require('discord-inline-replys')
module.exports = {
    config:{
        name: 'disableantiinv',
        aliases: ['disableantiinvite'],
        description: 'disable anti invite'
    },
    async run(bot, message, args){
        if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.reply(`You dont have enough perms`)
   let a = db.fetch(`antiinv_${message.guild.id}`)
   if(!a) return message.mentionReply(`anti invite is already disabled!`)
   else{
        
             db.delete(`antiinv_${message.guild.id}`)
             message.noMentionReply(`anti invite has been removed!`)
   }
    }
}