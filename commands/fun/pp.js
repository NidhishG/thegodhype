const Discord = require(`discord.js`)
module.exports = {
    config:{
        name: 'pp',
        alises: ['ppsize'],
        description: 'shows ur pp :flushed:'
    },
    async run(bot, message, args){
       const pps = ['8=D', '8==D', '8===D', '8====D', '8=====D', '8======D', '8======D', '8=======D',
    '8========D', '8=========D', '8==========D', '8==========D', '8=============D']

    let size = pps[Math.floor((Math.random() * pps.length))];
    let user = message.mentions.members.first() || message.author

    const embed = new Discord.MessageEmbed()
    .setColor(`ff0000`)
    .setTitle(`PP Size Machine`)
    .setDescription(`<@${user.id}>'s PP \n ${size}`)
    message.channel.send(embed)
}
}