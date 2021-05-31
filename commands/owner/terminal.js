const child = require(`child_process`)
require(`discord-inline-replys`)
const Discord = require(`discord.js`)

module.exports = {
    config:{
    name: 'terminal',
    alises: ['shell', 'console'],
    description: 'uses terminal access as a command'
},
async run(bot, message, args){
    if(message.author.id !== '706192191198068778') return message.mentionReply(`only my owner can use this lmfao`)
    const command = args.join(" ")
    if(!command) return message.mentionReply(`Please give me a command to use in terminal`)
    child.exec(command, (err, res)=>{
        if(err) return console.log(err)

        message.noMentionReply(res.slice(0, 2000), {code: 'js'})
    })

}
}