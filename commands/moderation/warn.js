const Discord = require('discord.js');
const randomstring = require(`randomstring`)
const db = require('quick.db');
module.exports = {
    config:{
    name: "warn",
    description: "Warn a member",
    },

    async run (bot, message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You can\'t use that');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send('Please specify a user, via mention or ID');

        if(user.bot) return message.channel.send('You can\'t warn bots');

        if(message.author.id === user.id) return message.channel.send('You can\'t warn yourself nitwit');

        if(message.guild.owner.id === user.id) return message.channel.send('You can\'t warn the server\'s owner');

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === 5) return message.channel.send(`${user} has already reached five warnings`);
        const bruh = randomstring.generate(7);


        if(warnings === null) {
            const newembed = new Discord.MessageEmbed()
            .setTitle(`You were warned in ${message.guild.name}`)
            .setColor(`ff0000`)
            .addField(`**Reason**`, `${reason}`)
            .addField(`**Warned By:**`, `${message.author.username}`)
            .addField(`**Warn ID**`, `\`${bruh}\``)

            const lolembed = new Discord.MessageEmbed()
            .setTitle(`${user} warned in ${message.guild.name}`)
            .setColor(`ff0000`)
            .addField(`**Reason**`, `${reason}`)
            .addField(`**Warned By:**`, `${message.author.username}`)
            .addField(`**Warn ID**`, `\`${bruh}\``)

            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            db.set(`warn_${bruh}`, `[MESSAGE LINK](${message.url})\n**REASON:** ${reason} \n **WARNED BY:** ${message.author.tag}`)
            user.send(newembed)
            await message.channel.send(lolembed)
        }

        if(warnings !== null){
            

            const dumbembed = new Discord.MessageEmbed()
            .setTitle(`${user.username} warned in ${message.guild.name}`)
            .setColor(`ff0000`)
            .addField(`**Reason**`, `${reason}`)
            .addField(`**Warned By:**`, `${message.author.username}`)
            .addField(`**Warn ID**`, `\`${bruh}\``)

            
            const userembed = new Discord.MessageEmbed()
            .setTitle(`You were warned in ${message.guild.name}`)
            .setColor(`ff0000`)
            .addField(`**Reason**`, `${reason}`)
            .addField(`**Warned By:**`, `${message.author.username}`)
            .addField(`**Warn ID**`, `\`${bruh}\``)

            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            db.set(`warn_${bruh}`, `[MESSAGE LINK](${message.url})\n**REASON:** ${reason} \n **WARNED BY:** ${message.author.tag}`)
            user.send(userembed)
            await message.channel.send(dumbembed)
        }
    }
}