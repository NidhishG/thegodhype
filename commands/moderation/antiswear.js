const db = require('quick.db');

module.exports = {
    config:{
    name: 'antiswear',
    aliases: ['cursefilter'],
    },
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have admin permission');
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('I need  manage messages permission');
            
            await db.set(`antiswear_${message.guild.id}`, 1)
            message.channel.send('Antiswear is now on!')

        } 
    
}