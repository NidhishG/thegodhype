const Discord = require("discord.js");
const db = require('quick.db');

const embed = new Discord.MessageEmbed()
.setTitle('**invalid usage**')
.setColor('ff0000')
.setDescription(`\`\`\`flip <heads/tails> <amount>\`\`\``)

module.exports = {
    config:{
    name: 'coinflip',
    aliases: ['flipcoin', 'cf', 'flip'],
    cooldown: 7, 
    description: "flip",
    },
    run(bot, message, args) {
        let user = message.author
        const coin = ['heads', 'tails']
        const choice = args[0]
        const amount = args[1]
        const account = db.get(`money_${user.id}`)

        if (!args[0]) return message.channel.send(embed)
        if (!args[1]) return message.channel.send(embed)

        if (!coin.includes(choice)) return message.reply('you have to chose from `heads` or `tails`!')

        if (amount > account) return message.reply('you dont have enough 💵 to do that!')
        
        const flip = coin[Math.floor(Math.random() * coin.length)]

        if (flip === choice) {
            db.add(`money_${user.id}`, amount)
            const embed = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> the coin landed on \`${flip}\` and you got \`${amount}\` 💵`)
                .setColor('ff0000')
            message.channel.send(embed)
        } else {
            db.subtract(`money_${user.id}`, amount)
            const embed1 = new Discord.MessageEmbed()
                .setDescription(`<@${message.author.id}> the coin landed on \`${flip}\` and you lost \`${amount}\` 💵`)
                .setColor('ff0000')
            message.channel.send(embed1)
        }
    }
}