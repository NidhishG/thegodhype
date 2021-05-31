const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    config:{
    name: 'cclist',
    description: 'List all available tags',
    usage: 'cclist',
    guildOnly: true,
    },
    async run(bot, message, args) {
        let data = []

        db.all().filter(x => x.ID.startsWith(`tag_${message.guild.id}`)).forEach(async m => {
            let a = m.ID.split("_")
            data.push(`\`${a[2]}\``)
        })
        message.channel.send({
            embed: {
                title: 'Custom Commands available',
                description: data.join('\n ')
            }
        })
    }
}