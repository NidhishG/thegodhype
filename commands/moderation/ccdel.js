const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    config:{
    name: 'ccdelete',
    alises: ['ccdel'],
    description: 'Delete a tag',
    usage: 'taglist',
    guildOnly: true,
    },
    async run(bot, message, args) {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('what you trying to do')
        let tag = args[0]
        if(!tag) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('Please provide a tag for me to delete!')
        )
        if(db.get(`tag_${message.guild.id}_${tag}`) === null) return message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Error')
                .setDescription('No such tag exists!')
        )
        db.delete(`tag_${message.guild.id}_${tag}`)
        await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('Success!')
                .setColor("GREEN")
                .setDescription('I have deleted the tag ' + tag)
        )
    }
}