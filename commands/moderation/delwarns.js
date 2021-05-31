const db = require('quick.db');
const warnings = require('../moderation/warnings');

module.exports = {
    config:{
    name: "deletewarns",
    description: "Delete a member's warns",
    },

    async run(bot, message, args){
        if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send('You can\'t use that.');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(user.id === message.author.id) return message.channel.send('You can\'t clear your own warnings');

        if(warnings === null) return message.channel.send(`**${user.username} has no warnings**`);

let amount = args[1]
if(!amount) return message.channel.send(`How many warns would you like me to delete?`)
        db.subtract(`warnings_${message.guild.id}_${user.id}`, amount);

        message.channel.send('Success!')
    }
}