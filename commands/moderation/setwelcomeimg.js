
module.exports = {
    config:{
    name: 'setwelcomeimg',
    alises: ['setwelimg', 'setwelimage', 'setwelcomeimage'],
    description: 'backround for welcome message',
    },
   async run(bot, message, args){
    const discord = require("discord.js");
    const db = require('quick.db')
    
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to excute this command!")
        let channel = message.mentions.channels.first()
        if(!channel) return message.channel.send("Please Provide the welcome channel")
        message.channel.send(`successfully set the welcome channel to ${channel}`)
        await db.set(`welcomeChannel_${message.guild.id}`, channel.id)
    
    
}
}