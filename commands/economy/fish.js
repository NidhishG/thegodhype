const db = require('quick.db')
const ms = require('parse-ms')
module.exports = {
    config:{
    name: 'fish',
    cooldown: '20',
    description: "fishes",
    usage: 'fish',
    },
    async run(bot, message, args, Discord){
        const fish =   db.fetch(`fishing_${message.author.id}`)
        if(fish < 1 ) return message.channel.send('you dont have a fishingpole!')
        else {

            const queries  = ["carp", "eel", "salmon", 'ide', 'eagle ray', 'cod', 'angler', 'tuna']
            const randomf = queries[Math.floor(Math.random() * queries.length)]
            const random = Math.floor(Math.random() * 1000) + 1;
            const fishlol = new Discord.MessageEmbed()
            .setColor(`ff0000`)
            .setTitle(`Fishing 🎣`)
            .setDescription(`You found an ${randomf} :fish: and sold it for \`${random}\`:dollar:`)
            message.channel.send(fishlol)
            db.add(`money_${user.id}`, random)
        }



    }
}