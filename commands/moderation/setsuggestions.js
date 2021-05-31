const db = require('quick.db')
module.exports = {
    config:{
        name: 'setsuggestions',
        aliases: ['setsugestionchannel'],

    },
    async run(bot, message, args){
        if(!message.member.hasPermission(`ADMINISTARTOR`)) return message.reply(`missing perms bruh`)
        const channel = message.mentions.channels.first()
        if(!channel) return message.channel.send(`Please mention the channel you would like suggestions to be in`)
        db.set(`suggestion_${message.guild.id}`, channel.id)
        message.channel.send(`Suggestion channel has been set to <#${channel}>, if any one types there, it will delete and mark a suggestion.`)
    }
}

