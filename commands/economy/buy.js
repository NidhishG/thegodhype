const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
config:{
        name: "buy",
        noalias: [""],
        category: "economy",
        description: "buys items",
        usage: "[item]",
        accessableby: "everyone",
},
    run: async (bot, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`);
if (prefix === null) prefix = 'a!'
        let user = message.author;
      
        let author = db.fetch(`money_${user.id}`)



        if (args.join(' ').toLocaleLowerCase() == 'toyota') {
            let Embed5 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 5000 coins to purchase a new car`);

            if (author < 5000) return message.channel.send(Embed5)

            await db.fetch(`toyota_${user.id}`)
            db.add(`toyota_${user.id}`, 1)
            

            let Embed6 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased A New Toyota For 5000 Coins`);

                db.subtract(`money_${user.id}`, 5000)

            message.channel.send(Embed6)
            db.push(message.author.id, "Toyota");

        } else if (args.join(' ').toLocaleLowerCase() == 'acura') {
            let Embed7 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`❌ You need 12000 coins to purchase an Acura`);

            if (author < 12000) return message.channel.send(Embed7)

            await db.fetch(`acura_${user.id}`)
            db.add(`acura_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`✅ Purchased An Acura For 12000 Coins`);

            db.subtract(`money_${user.id}`, 12000)
            message.channel.send(Embed8)
            db.push(message.author.id, "Acura");



          }  else if (args.join(' ').toLocaleLowerCase() == 'ford') {
                let Embed7 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You need 20000 coins to purchase a Ford`);
    
                if (author < 20000) return message.channel.send(Embed7)
    
                await db.fetch(`ford_${user.id}`)
                db.add(`ford_${user.id}`, 1)
    
                let Embed8 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Purchased A Ford For 20000 Coins`);
    
                db.subtract(`money_${user.id}`, 20000)
                message.channel.send(Embed8)
                db.push(message.author.id, "Ford");

    


            }  else if (args.join(' ').toLocaleLowerCase() == 'bmw') {
                let Embed7 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You need 50000 coins to purchase a BMW`);
    
                if (author < 50000) return message.channel.send(Embed7)
    
                await db.fetch(`BMW_${user.id}`)
                db.add(`BMW_${user.id}`, 1)
    
                let Embed8 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Purchased A BMW For 50000 Coins`);
    
                db.subtract(`money_${user.id}`, 50000)
                message.channel.send(Embed8)
                db.push(message.author.id, "BMW");

    
 

            }  else if (args.join(' ').toLocaleLowerCase() == 'chevy') {
                let Embed7 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You need 30000 coins to purchase a Chevy`);
    
                if (author < 30000) return message.channel.send(Embed7)
    
                await db.fetch(`Chevy_${user.id}`)
                db.add(`Chevy_${user.id}`, 1)
                

    
                let Embed8 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Purchased A Chevy For 30000 Coins`);
    
                db.subtract(`money_${user.id}`, 30000)
                message.channel.send(Embed8)
                db.push(message.author.id, "Chevy");

    
              }  else if (args.join(' ').toLocaleLowerCase() == 'mercedes') {
                    let Embed7 = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`❌ You need 70000 coins to purchase a Mercedes-Benz`);
        
                    if (author < 70000) return message.channel.send(Embed7)
        
                    await db.fetch(`Mercedes_${user.id}`)
                    db.add(`Mercedes_${user.id}`, 1)
                    
    
        
                    let Embed8 = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription(`✅ Purchased A Mercedes For 70000 Coins`);
        
                    db.subtract(`money_${user.id}`, 70000)
                    message.channel.send(Embed8)
                    db.push(message.author.id, "Mercedes");

                 }

                 
             else if (args.join(' ').toLocaleLowerCase() == 'maserati') {
                let Embed7 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You need 90000 coins to purchase a Maserati`);
    
                if (author < 90000) return message.channel.send(Embed7)
    
                await db.fetch(`Maserati_${user.id}`)
                db.add(`Maserati_${user.id}`, 1)
                

    
                let Embed8 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Purchased A Maserati For 90000 Coins`);
    
                db.subtract(`money_${user.id}`, 90000)
                message.channel.send(Embed8)
                db.push(message.author.id, "Maserati");

             
             }
                    /// can you add fishing pole and push it with fishingpole_
             else if (args.join(' ').toLocaleLowerCase() == 'sniper') {
                let Embed7 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ You need 10000 coins to purchase a sniper`);
    
                if (author < 10000) return message.channel.send(Embed7)
    
                await db.fetch(`sniper_${user.id}`)
                db.add(`sniper_${user.id}`, 1)
                

    
                let Embed8 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`✅ Purchased a sniper For 10000 Coins`);
    
                db.subtract(`money_${user.id}`, 10000)
                message.channel.send(Embed8)
                db.push(message.author.id, "sniper");

             
             }
       else if (args.join(' ').toLocaleLowerCase() == 'fishingpole') {
        let Embed7 = new MessageEmbed()
            .setColor("RED")
            .setDescription(`❌ You need 15000 coins to purchase a fishing pole`);

        if (author < 15000) return message.channel.send(Embed7)

        await db.fetch(`fishing_${user.id}`)
        db.add(`fishing_${user.id}`, 1)
        


        let Embed8 = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`✅ Purchased a fishing pole For 15000 Coins`);

        db.subtract(`money_${user.id}`, 10000)
        message.channel.send(Embed8)
        db.push(message.author.id, "fishingpole");

     
     }

                 
 else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed9 = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`❌ Enter An Item To Buy!\nType a!store To See List Of Items!`)
                return message.channel.send(embed9)
            }
        }
    }
}