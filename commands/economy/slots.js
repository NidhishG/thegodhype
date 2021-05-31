const db = require('quick.db');

const { MessageEmbed } = require("discord.js");


module.exports = {
    config:{
    name: 'slots',
    cooldown: 15,
    aliases: ['slot'],
    description: "slots <amount>",
    },
   run: async(bot, message, args, Discord) => {
        
const embed = new MessageEmbed()
.setTitle('**invalid usage**')
.setColor('ff0000')
.setDescription(`\`\`\`slots <amount>\`\`\``)
        let user = message.author

        let result = 'lose'
        const amount = args[0]
        const account = db.get(`money_${user.id}`)

        if (!args[0]) return message.channel.send(embed)

        if (isNaN(args[0])) return message.reply('amount must be a number!')

        if (amount > account) return message.reply('you dont have enough 💵 to do that!')

        if (amount < 10) return message.reply('you have to bet at least `10` 💵')
        
        //const spin = result[Math.floor(Math.random() * result.length)]
    
        const emojis = ['💯', '💰', '🏅', '💎', '💵', '🕊️']

        //get emojis kek
        
        const em1 = emojis[Math.floor(Math.random() * emojis.length)]
        const em2 = emojis[Math.floor(Math.random() * emojis.length)]
        const em3 = emojis[Math.floor(Math.random() * emojis.length)]

        if (em1 === em2) result = 'win'
        if (em3 === em2) result = 'win'
        if (em3 === em1) result = 'win'

        const embed1 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle('► | <a:slots:823738633470214155> | <a:slots:823738633470214155> | <a:slots:823738633470214155> | ◄')
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

        const msg = await message.channel.send(embed1)

        if (result === 'win') {

            const winm1 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | <a:slots:823738633470214155> | <a:slots:823738633470214155> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

            const winm2 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | <a:slots:823738633470214155> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

            const winm3 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | ${em3} | ◄`)
            .setDescription(`----- **YOU WON** -----\n**AMOUNT:** +\`${amount*2}\` 💵`)
            .setColor('00ff00')
            .setTimestamp()

            //edit embeds

            setTimeout(() => msg.edit(winm1), 2000)

            setTimeout(() => msg.edit(winm2), 3000)

            setTimeout(() => msg.edit(winm3), 4000)

            //win add

            db.add(`money_${user.id}`, amount*2)

        } else {

            const losem1 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | <a:slots:823738633470214155> | <a:slots:823738633470214155> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

            const losem2 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | <a:slots:823738633470214155> | ◄`)
            .setDescription(`------ **SPINNING** ------\n**BET:** \`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

            const losem3 = new MessageEmbed()
            .setAuthor(`${message.author.username}'s slot machine`)
            .setTitle(`► | ${em1} | ${em2} | ${em3} | ◄`)
            .setDescription(`----- **YOU LOST** -----\n**AMOUNT:** -\`${amount}\` 💵`)
            .setColor('ff0000')
            .setTimestamp()

            //edit embeds

            setTimeout(() => msg.edit(losem1), 2000)

            setTimeout(() => msg.edit(losem2), 3000)

            setTimeout(() => msg.edit(losem3), 4000)

            //lose subtract

            db.subtract(`money_${user.id}`, amount)

        }
    }
}