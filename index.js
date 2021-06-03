const { Client, MessageAttachment, Collection, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { PREFIX, TOKEN, DBL_API_KEY } = require('./config');
require(`nidhish`)
const bot = new Client({ disableMentions: 'everyone' });
const DBL = require('dblapi.js');
const dbl = new DBL(DBL_API_KEY)
const rs = require(`randomstring`)
const fs = require("fs");
const db = require('quick.db');
const date = new Date()
let time = date.toLocaleTimeString();
const fetch = require(`node-fetch`)
const ms = require(`ms`)
const logs = require('discord-logs');
logs(bot);
const words  = ['wtf', 'whatthefuck', 'nigger', 'fuck', 'fack , kut' , 'kkr' , 'kanker', 'homo', 'suck', 'f u', 'neger', 'dick', 'asshole' , 'bitch', 'wanker', 'nazi','nidhish is 11', 'shit', 'sex', 'porn' ]

const jimp = require('jimp');
const { Canvas } = require('canvas-constructor');
const { createCanvas, loadImage } = require('canvas')
const { GiveawaysManager } = require("discord-giveaways");
const yaml = require("js-yaml");
const message = require('./events/message');
const { botlog } = yaml.load(fs.readFileSync("./config.yml"));
bot.phone = new Collection();
bot.commands = new Collection();
bot.aliases = new Collection();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./handler/${x}`)(bot));

bot.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});
bot.on('ready', () => {
    setInterval(() => {
        dbl.postStats(bot.guilds.cache.size);
    }, 1800000);
});

bot.snipes = new Map();
bot.on('messageDelete', function(message, channel){
bot.snipes.set(message.channel.id,{
    content:message.content,
    author:message.author.tag,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
})
/*
bot.on("message", async (message) => {
    let a = db.fetch(`antiswear_${message.guild.id}`)
    if(a === null) return
    
    const array = ['wtf', 'whatthefuck', 'nigger', 'fuck', 'fack , kut' , 'kkr' , 'kanker', 'homo', 'suck', 'f u', 'neger', 'dick', 'asshole' , 'bitch', 'wanker', 'nazi','nidhish is 11', 'shit', 'sex', 'porn' ]
    if(array.some(w => `${message.content.toLowerCase()}` .includes(`${w}`))){
        message.delete().then((message)  => {
        message.reply('You are not allowed to swear in this server, continueing to do so will result in severe consequesnces. ').then ((message)  => {
        setTimeout(async() => {
            message.delete()
        },10000)})
    })
    db.add(`warnings_${message.guild.id}`, 1)
    }
  })
  */
  

/*
client.on('message', async message => {
    let guild = message.client.guilds.cache.find(g => g.id === GUILD)

    let modmailLog = guild.channels.cache.find(c => c.name === "modmail-logs")
    let modmailCategory = guild.channels.cache.find(c => c.name === "MODMAIL")
    let channelName = `${message.author.username}-${message.author.discriminator}`.toLowerCase()
    let firstAuthor = guild.channels.cache.find(ch => ch.name === channelName)


    if (message.author.bot) return

    if (message.channel.type === "dm") {

        if (!firstAuthor) {
            guild.channels.create(message.author.tag.split("#").join("-"), {
                type: 'text',
                reason: "Modmail",
                permissionOverwrites: [{
                    id: guild.roles.cache.find(r => r.name === "Modmail-Support").id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                }, {
                    id: guild.id,
                    deny: ['VIEW_CHANNEL']
                }]
            }).then(async m => {
                m.setParent(modmailCategory.id)
                m.send({
                    embed: {
                        color: colors.blue,
                        description: `Type a message in this channel to reply. Messages starting with the server prefix \`$\` are ignored, and can be used for staff discussion. Use the command \`$close [reason]\` to close this thread.`,
                        title: 'New thread',
                        footer: {
                            text: `${message.author.tag} | ${message.author.id}`,
                            icon_url: message.author.displayAvatarURL()
                        },
                        timestamp: new Date()
                    }
                })

                await modmailLog.send({
                    embed: {
                        title: 'New Thread Created',
                        color: colors.blue,
                        footer: {
                            text: `${message.author.tag} | ${message.author.id}`,
                            icon_url: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        },
                        timestamp: new Date()
                    }
                })

                m.send({
                    embed: {
                        color: colors.green,
                        description: message.content,
                        title: 'Message Received',
                        footer: {
                            text: `${message.author.tag} | ${message.author.id}`,
                            icon_url: message.author.displayAvatarURL()
                        },
                        timestamp: new Date()
                    }
                })
                message.author.send({
                    embed: {
                        title: 'Message Sent',
                        description: message.content,
                        footer: {
                            text: guild.name,
                            icon_url: guild.iconURL({
                                dynamic: true
                            })
                        },
                        timestamp: new Date(),
                        color: colors.green
                    }
                })
            })
        } else {
            await firstAuthor.send({
                embed: {
                    color: colors.green,
                    description: message.content,
                    title: 'Message Received',
                    footer: {
                        text: `${message.author.tag} | ${message.author.id}`,
                        icon_url: message.author.displayAvatarURL()
                    },
                    timestamp: new Date()
                }
            })
            await message.author.send({
                embed: {
                    title: 'Message Sent',
                    description: message.content,
                    footer: {
                        text: guild.name,
                        icon_url: guild.iconURL({
                            dynamic: true
                        })
                    },
                    timestamp: new Date(),
                    color: colors.green
                }
            })
            
        }
    } else {
        if (message.guild.channels.cache.find(c => c.name === "MODMAIL")) {
            if (message.channel.parentID === message.guild.channels.cache.find(c => c.name === "MODMAIL").id) {

                if (!message.content.startsWith(PREFIX)) {
                    let channelName = `${message.channel.name.split("-")[0]}`
                    let channelTag = message.channel.name.split("-")[1]
                    let User = message.guild.members.cache.find(r => r.user.tag.toLowerCase() === `${channelName}#${channelTag}`)
                    message.delete()

                    let receiveEmbed = new Discord.MessageEmbed()
                        .setTitle('Message Sent')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setDescription(message.content)
                        .setColor(colors.orange)
                        .setFooter(`${message.author.tag} | ${message.author.id}`)
                        .setTimestamp()
                    message.channel.send(receiveEmbed)

                    let messageReceiveEmbed = new Discord.MessageEmbed()
                        .setTitle('Message Received')
                        .setAuthor(message.author.tag, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setDescription(message.content)
                        .setColor(colors.orange)
                        .setFooter(`${message.guild.name} | ${message.guild.id}`)
                        .setTimestamp()
                    User.send(messageReceiveEmbed)
                }
            }
        }

    }
})
*/

bot.on('guildMemberAdd', async (member) => {
    let roleID = db.get(`autorole_${member.guild.id}`)
    if(!roleID) return;
  
    
   let role = member.guild.roles.cache.find(r => r.id === roleID);
    
    member.roles.add(role)
})
})
bot.on("message", async message=>{
    if(db.has(`afk_${message.author.id}+${message.guild.id}`)) { 
        const oldReason = db.get(`afk_${message.author.id}+${message.guild.id}`) 
        await db.delete(`afk_${message.author.id}+${message.guild.id}`) 
        message.mentionReply(`I have removed your afk for \`${oldReason}\``) 
    }
    
    
    
    if(message.mentions.members.first()) {
        // if someone mentioned the person
        if(db.has(`afk_${message.mentions.members.first().id}+${message.guild.id}`)) { 
            const lolreason = db.get(`afk_${message.mentions.members.first().id}+${message.guild.id}`) 

            message.channel.send(`${message.mentions.members.first().user.tag} is afk for \`${lolreason}\`` ) // if yes, it gets from the db the afk msg and send it
        }
     }
    
})
bot.on("message", async message => {
    let lol = db.fetch(`chatbot_${message.guild.id}`)
if(message.channel.id === lol) {
   
    if (message.author.bot) return;
    if (message.content.includes(`@`)) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here").replace((/\s/g, 'message')).toLowerCase();
    message.channel.startTyping();
    if (message.attachments.size > 0) return message.reply("I can't see images!")
    if (!message.content) return message.reply("Please say something.")
    if(message.channel.send){
  }
  
    try {
      fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${bot.user.username}&ownername=nidhish`)
      .then(res => res.json())
      .then(data => {
        setTimeout(async function() {
            const embed = new MessageEmbed()
            .setColor(`ff0000`)
            .setTitle(`:speech_left: | Response for ${message.author.username}`)
            .setDescription(`${data.message}`)
            .setFooter(`Chat Bot learns more the longer you talk to it!`)
          message.MentionReply(embed);
      }, ms("0.8s"));
      });
        message.channel.stopTyping();
    } catch { 
      return message.channel.send("I can't think of anything now...")
    }}});
  
bot.on("guildMemberAdd", async(member, message)=>{
    const channell = db.get(`welcome_${member.guild.id}`)
    let msg = db.get(`welcomemsg_${member.guild.id}`)
 
    const channel = member.guild.channels.cache.get(channell);
    if (!channel) return;
    if (msg === null) msg = `just joined :)`

    channel.send(`${member}, ${msg}`)

})



bot.on("guildMemberAdd", async (member) => {
    const fetch = require('node-fetch');

    let background;
    let backgrounds = db.fetch(`background_${member.guild.id}`)
    if(backgrounds == null) {
        background = 'https://cdn.discordapp.com/attachments/819284150791176232/825290048659914782/abstract-dotted-banner-background_1035-18160.png'
    } else {
        background = backgrounds
    }
    const avatar = member.user.displayAvatarURL({dynamic: false})
    const title = member.user.username
    const Member12 = member.guild.memberCount
    const sub = `Member ${Member12}`
    const color = 'ff0000'
    const res = await fetch(`https://frenchnoodles.xyz/api/endpoints/welcomebanner?background=${background}&avatar=${avatar}&title=${title}&subtitle=${sub}&textcolor=${color}`, {
        headers: {
            'APIKEY': 'f8xftlruivhjdRn85zYJoSxBrDcDj2Pxu0Loa8'
        }
    })

    const welcomechannel = db.fetch(`welcomeChannel_${member.guild.id}`)
    if(welcomechannel == null) {
        return
    }
    
    else {
     
        const Wchannel =  member.guild.channels.cache.get(welcomechannel)
        let Image = await res.buffer()
        const WImage = new Discord.MessageAttachment(Image)
        Wchannel.send(`Welcome to the server ${member}`, WImage)
        
    }

    
  }) 

  bot.on("guildMemberBoost", (member) => {
    const channell = db.get(`boost_${member.guild.id}`)
  
    const logchannel = member.guild.channels.cache.get(channell);
    let msg = db.get(`boostmsg_${member.guild.id}`)
    const embed = new Discord.MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setThumbnail('https://cdn.discordapp.com/emojis/660789028861509633.png?v=1')
    .setColor('#ff00f7')
    .setDescription(`<@${member.id}>, ${msg}`)
    logchannel.send(embed)
  });
      
bot.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;
  let ticketid = await db.get(`tickets_${reaction.message.guild.id}`);
  if(!ticketid) return;
  if(reaction.message.id == ticketid && reaction.emoji.name == '🎟️') {
    db.add(`ticketnumber_${reaction.message.guild.id}`, 1)
    let ticketnumber = await db.get(`ticketnumber_${reaction.message.guild.id}`)
    if (ticketnumber === null) ticketnumber = "1"
    reaction.users.remove(user);
      reaction.message.guild.channels.create(`ticket-${ticketnumber}`, { 
          permissionOverwrites: [
              {
                  id: user.id,
                  allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
              },
              {
                  id: reaction.message.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL"]
              }
          ],
          type: 'text'
      }).then(async channel => {
        channel.send(`<@${user.id}>`)

        let ticketmsg = await channel.send(new Discord.MessageEmbed()
        .setTitle(`${user.username} Ticket`)
        .setDescription("Our Staff Team Will Be With you soon\nTo Close Ticket React With 🔐")
        .setFooter(reaction.message.guild.name)
    );    

            ticketmsg.react('🔐')
            console.log(`${ticketmsg.id}`)
            db.set(`closeticket_${reaction.message.guild.id}_${reaction.message.author.id}`, ticketmsg.id)
      })
  }
});

bot.on("guildCreate", guild => {
    bot.channels.cache.get(botlog).send(`** NEW GUILD **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
});
bot.on("guildRemove", guild => {
    bot.channels.cache.get(botlog).send(`** GUILD REMOVED **\n Server: ${guild.name}\n Server ID: ${guild.id}`)
});

bot.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  if (user.bot) return;
  let ticketid = await db.get(`closeticket_${reaction.message.guild.id}_${reaction.message.author.id}`);
  if(!ticketid) return;
  if(reaction.message.id == ticketid && reaction.emoji.name == '🔐') {
    db.add(`closedtickets_${reaction.message.guild.id}`, 1)
    let closednumber = await db.get(`closedtickets_${reaction.message.guild.id}`)
    reaction.message.channel.setName(`Closed-${closednumber}`)
    reaction.users.remove(user);
    reaction.message.channel.send(`**Ticket Closed**`)
  await  reaction.message.channel.setTopic(`Closing.`)
   reaction.message.channel.delete()
  }
});


/*
bot.on('messageReactionAdd', async (reaction, user) => {
    const handleStarboard = async (message) => {
        const sbdb = db.fetch(`star_${message.guild.id}`)
        if(sbdb === null) return
        const SBChannel = bot.channels.cache.get(sbdb)
        const msgs = await SBChannel.messages.fetch({ limit: 100 });
        const SentMessage = msgs.find(msg => 
            msg.embeds.length === 1 ?
            (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(SentMessage) SentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new Discord.MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL())
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor('YELLOW')
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(SBChannel)
            SBChannel.send('1 - ⭐', embed);
        }
    }
    const sbdb = db.fetch(`star_${message.guild.id}`)
        if(sbdb === null) return
        const SBChannel = bot.channels.cache.get(sbdb)
    if(reaction.emoji.name === '⭐') {
        if(reaction.message.channel.name.toLowerCase() === SBChannel) return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
            handleStarboard();
        }
        else
        handleStarboard();
    }
});
*/
//Mod logs

bot.on("roleCreate" , async(role)=>{
    
    const channell = db.get(`modlogs_${role.guild.id}`)
    const channel = role.guild.channels.cache.get(channell);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setDescription(`<:news:843104106569662495>**New Role Created**`)
    .addField('ROLE:', `\`\`\`yaml\n@${role.name}\`\`\``)
    .setFooter(`ID: ${role.id}`)
    .setColor('ff0000')
    .setTimestamp()
channel.send(embed)
})
bot.on("roleDelete" , async(role)=>{
    
    const channell = db.get(`modlogs_${role.guild.id}`)
    const channel = role.guild.channels.cache.get(channell);
    if (!channel) return;
    const embed = new MessageEmbed()
    .setDescription(`<:news:843104106569662495>**Role Deleted**`)
    .addField('ROLE:', `\`\`\`yaml\n@${role.name}\`\`\``)
    .setFooter(`ID: ${role.id}`)
    .setColor('ff0000')
    .setTimestamp()
channel.send(embed)
})
bot.on("messageDelete", async(message)=>{
    const channell = db.get(`modlogs_${message.guild.id}`)
    const channel = message.guild.channels.cache.get(channell);
    if (!channel) return;
const embed = new Discord.MessageEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
.setDescription(`<:news:843104106569662495>**Message Deleted By** <@${message.author.id}> **in** <#${message.channel.id}>`)
.addField(`**MESSAGE**`, `\`\`\`yaml\n${message.content}\n\`\`\``)
.addField(`**MESSAGE ID**`, `${message.id}`)
.setColor(`ff0000`)
.setTimestamp()
channel.send(embed)
})




bot.on('message', async message => {
    let prefix;
    if (message.author.bot || message.channel.type === "dm") return;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
})

bot.on("messageReactionAdd", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.hasPermission("MANAGE_ROLES")) return;
    const member = guild.members.cache.get(user.id);
    if (!member) return;
  const data = db.get(`reactions_${guild.id}_${reaction.message.id}`)
    if (!data) return;
    const reaction2 = data.find(
      (r) => r.emoji === reaction.emoji.toString()
    );
    if (!reaction2) return;
  member.roles.add(reaction2.roleId).catch(err => undefined);
  });
  
  bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.hasPermission("MANAGE_ROLES")) return;
    const member = guild.members.cache.get(user.id);
    if (!member) return;
  const data = db.get(`reactions_${guild.id}_${reaction.message.id}`)
    if (!data) return;
    const reaction3 = data.find(
      (r) => r.emoji === reaction.emoji.toString()
    );
    if (!reaction3) return;
  member.roles.remove(reaction3.roleId).catch(err => undefined);
  });
  
bot.on("message", async(message)=>{



    

    xp(message)
    if(message.content.startsWith(`a!rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 1000  // 500 + 1000 + 1500
    const embedlvl = new Discord.MessageEmbed()
    }
  

    function xp (message) {
      let xplol =  db.fetch(`guildMessages_${message.guild.id}`)

      if(xplol === null) return
      else{
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 12;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500 + 1000 
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            message.channel.send(`Congrats ${message.author}, you leveled up, you are now level ${newLevel}`)
        }
    } 
  }
    
    
})

bot.on('message', async message => {
    let prefix;
        try {
            let fetched = await db.fetch(`prefix_${message.guild.id}`);
            if (fetched == null) {
                prefix = PREFIX
            } else {
                prefix = fetched
            }
        } catch (e) {
            console.log(e)
    };
    try {
        if (message.mentions.has(bot.user) && !message.mentions.has(message.guild.id)) {
            return message.channel.send('**My Prefix In This Server is - \`${prefix}\` You can change your prefix with the command \`${prefix}setprefix\`**')
        }
    } catch {
        return;
    };
});

bot.on('message', async message => {
  
    try {
        const hasText = Boolean(message.content);
        const hasImage = message.attachments.size !== 0;
        const hasEmbed = message.embeds.length !== 0;
        if (message.author.bot || (!hasText && !hasImage && !hasEmbed)) return;
        const origin = bot.phone.find(call => call.origin.id === message.channel.id);
        const recipient = bot.phone.find(call => call.recipient.id === message.channel.id);
        if (!origin && !recipient) return;
        const call = origin || recipient;
        if (!call.active) return;
        await call.send(origin ? call.recipient : call.origin, message, hasText, hasImage, hasEmbed);
    } catch {
        return;
    };
});



const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {

    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways(){
        // Get all the giveaway in the database
        return db.get("giveaways");
    }

    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData){
        // Add the new one
        db.push("giveaways", giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageID, giveawayData){
        // Gets all the current giveaways
        const giveaways = db.get("giveaways");
        // Remove the old giveaway from the current giveaways ID
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        // Push the new giveaway to the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID){
        // Remove the giveaway from the array
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

};
if(!db.get("giveaways")) db.set("giveaways", []);
// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(bot, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
bot.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

bot.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

bot.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

//antiinvite
/*
bot.on("message", async message=>{
    let heckya = db.fetch(`antiinv_${message.guild.id}`)
    if(heckya === null) return
const InviteLinks = ['discord.gg/', 'discord.com/invite/', 'discordapp.com/invite/']

if(InviteLinks.some(link => message.content.toLowerCase().includes(link))) {
    const UserCode = message.content.split('discord.gg/' || 'discord.com/invite/' || 'discordapp.com/invite/')[1]
    message.guild.fetchInvites().then(invites => {
        let InviteArray = []
        for (let inviteCode of invites) {
            InviteArray.push(inviteCode[0])
        }
        if(!InviteArray.includes(UserCode)) {
            message.delete()
            return message.channel.send("Anti Link is enabled here, please do not send any more links")

        }
    })

}
    


})
*/

//confessions
bot.on("message", async message=>{
    if(message.author.bot) return
    let hi = db.fetch(`confessionchan_${message.guild.id}`)
    let hi2 = db.fetch(`confessionchan2_${message.guild.id}`)
    if(message.channel.id === hi){
        message.delete()
     
        const channel = message.guild.channels.cache.get(hi2)
        const embed = new MessageEmbed()
        .setTitle(`New Confession 😇`)
        .setColor(`ff0000`)
        .setDescription(message.content)
        .setFooter(`All confessions are anonymous`)
        
channel.send(embed)
    
     
     
    }
})
//suggestions
bot.on("message", async message =>{
    if(message.author.bot) return
 const sug = db.fetch(`suggestion_${message.guild.id}`)
 if(sug === null) return
 if(message.channel.id === sug){
     message.delete()
     const embed = new MessageEmbed()
     .setTitle(`New Suggestion`)
     .setDescription(message.content)
     .setColor(`ff0000`)
     .setFooter(`Suggestion by ${message.author.username}`)
     const msg = await message.channel.send(embed)
     msg.react(`✅`)
     msg.react(`❌`)
 }

})

//verification
bot.on("guildMemberAdd", async(member)=>{
    const bruggers = db.fetch(`captcha_${member.guild.id}`)
if(!bruggers === null) return
    const captcha = rs.generate(6)
    try {
        const msg = await member.send(`||${captcha}||, This is your captcha, you have 1m to solve it!`)
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha) return true;
                else {
                    m.channel.send("You entered the captcha wrong!") 
                    return false;
                }
            };
            const response = await msg.channel.awaitMessages(filter, { max: 1, time: ms('60s'), errors: ['time'] });
            if(response) {
                await msg.channel.send("You entered captcha correctly, You have verified yourself!")
                let role = member.guild.roles.cache.find(r => r.id === bruggers);

                member.roles.add(role)
            }
        } 
        catch (err) {
            await msg.channel.send("You didn't solve the captcha on time, you got kicked from the server")
            await member.kick()
        }
    } 
    catch (err) {
        console.log(err)
    }

    
} )




bot.login("ODUwMTA0NzQwNzIwNjcyNzk4.YLk3vA.jKzqQtT-bNes0HLjbQKruUims58");
