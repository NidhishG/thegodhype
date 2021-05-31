const db = require(`quick.db`)
module.exports = {
    config:{
        name: 'setconfessions',
        aliases: ['confessions']
    },
    async run(bot, message, args){
        if(!message.member.hasPermission(`ADMINISTARTOR`)) return message.reply(`missing the perms`)


const channel = message.mentions.channels.first()
const chanell = message.mentions.channels.last()
if(!channel) return message.reply(`**Usage** \n \`setconfessions <channel where the person sends> <channel where confessions is sent>\``)
if(!chanell) return message.reply(`**Usage** \n \`setconfessions <channel where the person sends> <channel where confessions is sent>\``)
db.set(`confessionchan_${message.guild.id}`, channel.id)
db.set(`confessionchan2_${message.guild.id}`, chanell.id)
message.channel.send(`Confessions are up and running!`)

    }
}