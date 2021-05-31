const db = require('quick.db')

module.exports = {
    config:{
    name: 'profile',
    alises: ['bio'],
    decription: 'shows users bio from setbio command',
    },
    async run(bot, message, args, Discord){
        let user =  message.mentions.members.first() 
        if(!user) return message.reply(`Please mention someone`)
        let bio =  db.fetch(`info_${user.id}`)
        if(!bio) return message.channel.send('That person does not have a bio')

        else{
            let bal = db.fetch(`money_${user.id}`);

            if (bal === null) bal = 0;
        
            let bank = await db.fetch(`bank_${user.id}`);
        
            if (bank === null) bank = 0;
        let Total = bal + bank

            const embed = new Discord.MessageEmbed()
            .setColor('ff0000')
            .setTitle(`${message.mentions.users.first().username}'s Profile`)
            .addField(`**Bio:**`, `${bio}`)
            .addField(`**Economy Coins:**`, `Wallet: \`${bal}\`:dollar: \n Bank: \`${bank}\`:dollar: \n Net Worth: \`${Total}\` :dollar:`)
            message.inlineReply(embed)
        }
    }
}