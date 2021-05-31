const Discord = require('discord.js');
const db = require('quick.db')
const { ReactionPages } = require('reconlx')

module.exports = {
    config:{
    name: "store",
    aliases: ['shop'],
    description: "View the store",
    },
    async run (bot, message, args) {
let user = message.author

let bal = db.fetch(`money_${user.id}`);

        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Store: Cars')
        .setDescription(`Do  \`buy <item>\` to purchase an item from the shop \n You have \`${bal}\`💵`)
        .addField('**Toyota**\n', '`5000`💵', inline = true)    
        .addField('**Acura**\n', '`12000`💵', inline = true)    
        .addField('**Ford**\n', '`20000`💵', inline = true)  
        .addField('**Chevy**\n', '`30000`💵', inline = true)  
        .addField('**BMW**\n', '`50000`💵', inline = true)
        .addField('**Mercedes**\n', '`70000`💵', inline = true)      
        .addField('**Maserati**\n', '`90000`💵', inline = true)      
        .setTimestamp();
     
        const embedd = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Shop')
        .setDescription(`Do \`buy <item>\` to purchase an item from the shop \n You have \`${bal}\`💵`)
        .addField('**Sniper**\n', '`10000`💵', inline = true)
        .addField('**Fishingpole**\n', '`15000`💵', inline = true)



        const pages = [embedd, embed]
        ReactionPages(message, pages, true)
    }
}