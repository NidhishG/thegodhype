const Discord = require('discord.js');

module.exports = {
    config:{
        name: 'fight',
        description: 'fight a mf'
    },
    async run(bot, message, args){

        const challenger = message.author;
        const oppenent = message.mentions.users.first();
        if (!oppenent) return message.channel.send(`Please mention who you want to fight`);
    const { fight } = require('weky')
    const x = new fight({
        client: bot,
        message: message,
        acceptMessage: 'Click to fight with ' + message.author,
        challenger: message.author,
        opponent: message.mentions.users.first()
    })
    x.start()
}
}
