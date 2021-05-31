const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
        name: "rank",
        aliases: ['rank'],
        category: 'info',
        description: 'Shows User Rank',
        usage: '[mention | username | nickname | ID]',
        accessableby: "everyone"
    },
    run: async (bot, message, args) => {
        const Canvacord = require('canvacord')
    
                const imagelink = db.get(`levelimage_${message.guild.id}`)
        
            let prefix = db.get(`prefix_${message.guild.id}`);
            if (prefix === null) prefix = 'a!'
                let xpisonoroff = db.fetch(`guildMessages_${message.guild.id}`)
                if(xpisonoroff === null){
                    return message.channel.send(`XP is off for this server, do ${prefix}setxp to enable`)
                }
                else{
                    var user = message.mentions.users.first() || message.author;
                    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
                    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
                    var xpNeeded = level * 500 + 1000 
                    const rankcard = new Canvacord.Rank()
                        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
                        .setCurrentXP(currentxp)
                        .setRequiredXP(xpNeeded)
                        .setStatus(user.presence.status)
                        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
                        .setRank(1, 'RANK', false)
                        .setProgressBar("#a81d16", "COLOR")
                        .setOverlay("#000000")
                        .setUsername(user.username)
                        .setDiscriminator(user.discriminator)
                        .setBackground("IMAGE", imagelink || "https://cdn.discordapp.com/attachments/833321345914765312/839465389057507358/c8fa45c7cf32e04c991b390908efcb2e.png")
                        rankcard.build()
                        .then(data => {
                            const atta = new Discord.MessageAttachment(data, "rank.png")
                            message.channel.send(atta)
                        })
            }
                }
        
            }
        
    
