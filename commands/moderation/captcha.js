const db = require(`quick.db`)

module.exports = {
    config:{
        name: 'captcha',
        alises: ['setcaptcha'],
        description: 'setcaptcha <role>'
    },
    async run(bot, message, args){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('what you trying to do')

const role = message.mentions.roles.first()
if(!role) return message.channel.send(`please give me a role, you can mention or give id`)

db.set(`captcha_${message.guild.id}`, role.id)
message.channel.send(`captcha has been enabled for verifiation!`)
    }
}