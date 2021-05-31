const db = require('quick.db')
const Discord = require(`discord.js`)
require(`discord-inline-replys`)
module.exports = {
    config:{
        name: 'setchat',
        aliases: ['setchatbotchannel'],
        description: 'set a channel for the chat bot'
    },
    async run(bot, message, args){
        if(!message.member.hasPermission(`BAN_MEMBERS`)) return message.reply(`You dont have enough perms`)
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`You need to mention a channel`)
        else{
             db.set(`chatbot_${message.guild.id}`, channel.id)
             message.noMentionReply(`Chat bot has been set in <#${channel.id}>`)
        }
    }
}