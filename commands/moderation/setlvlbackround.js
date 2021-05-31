module.exports = {
    config:{
name: 'setlvlbackround',
alises: ['setrankbackround'],
description: 'sets backround for rank cmd',
async run(bot, message, args){
    const db = require(`quick.db`)
    if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply('you have the wrong permissions!')
    const link = args.join(' ')
if(!link) return message.reply('please add a image link. like this setlevelimage <link>')
db.set(`levelimage_${message.guild.id}`, link)
message.channel.send('Backround image set!')
}
    }
}