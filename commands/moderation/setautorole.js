  

const db = require('quick.db');




module.exports = {
    config:{
    name: 'setautorole',
    aliases: ['autorole'],
    description: "sets a role that users will recieve when they join a server",
    },
    async run(bot, message, args, Discord) {
        if(message.member.permissions.has("ADMINISTRATOR")){
        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role){
            return( message.channel.send('I couldnt find the role') );
        }
        db.set(`autorole_${message.guild.id}`, role.id);
        const embed2 = new Discord.MessageEmbed()
        .setDescription(`**Role:** <@&${role.id}>`)
        .setFooter(`autorole set by: ${message.author.tag}`)
        .setTimestamp()
        .setColor('ff0000')

    message.channel.send(embed2)
       
  
           
             
        }
            else return message.reply('you dont have permission to run this command')
        
        
    }

}
