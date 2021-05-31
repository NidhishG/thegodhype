const { MessageEmbed } = require("discord.js");
const db = require(`quick.db`)
const ms = module.require("ms");
const endpoints = ['yahoo.com', 'hotmail.com', 'hype.com', 'gmail.com', 'dumbass.com', 'moron.com']
const lolpoints = ['Bruh ur mom has a huge ass', 'Im drunk hbu?', 'lol', 'What are you doing step bro', 'Dude wtf, im being robbed', 'No, your breaking up with me?', 'I saw Madison Beer\'s boobs!']
const google = ['Is it gay if you suck ur own?', 'If im 13, can i make a girl pregnant?', 'How to annoy my sibling', 'WIll nord vpn change my ip?', 'How is Hype so good?', 'Will condoms provide better sex?']
const sup = ['win', 'lose']
module.exports = {
    config:{
  name: "hack",
  description: "Another Economy Command",
    },
 async run(bot, message, args) {
     let user = message.author
    if (!args[0]) {
    return message.channel.send("Woah.... Slow Down!! Who are we hacking..??")
    }
    let hahahaha = endpoints[Math.floor(Math.random() * endpoints.length)]
    let kekw = lolpoints[Math.floor(Math.random() * lolpoints.length)]
    let dam = google[Math.floor(Math.random() * google.length)]
    const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 150;
    let suppp = sup[Math.floor(Math.random() * sup.length)]

    const tohack = message.mentions.members.first()
    if(suppp === 'win'){
    let msg = await message.channel.send(`Hacking ${tohack.displayName}....`);

    let time = '1s'
    setTimeout(function(){
    msg.edit(`Finding ${tohack.displayName}'s Email and Password.....`);
  }, ms(time));

    let time1 = '4s'
    setTimeout(function(){
    msg.edit(`E-Mail: ${tohack.displayName}@${hahahaha} \nPassword: ********`);
  }, ms(time1));


    let time3 = '7s'
    setTimeout(function(){
    msg.edit("Setting up Epic Games Account.....");
  }, ms(time3));

    let time4 = '9s'
    setTimeout(function(){
    msg.edit("Hacking Epic Games Account......");
  }, ms(time4));

    let time5 = '13s'
    setTimeout(function(){
    msg.edit("Hacked Epic Games Account!!");
  }, ms(time5));

    let time6 = '16s'
    setTimeout(function(){
    msg.edit("Collecting Info.....");
  }, ms(time6));

    let time7 = '18s'
    setTimeout(function(){
    msg.edit("Selling data to FBI....");
  }, ms(time7));

  const embed = new MessageEmbed()
  .setColor(`ff0000`)
  .setTitle(`${tohack.displayName}'s Info`)
  .addField(`**Password:**`, `${tohack.displayName}isacutie123`)
  .addField(`**Email:**`, `${tohack.displayName}@${hahahaha}`)
  .addField(`**Last DM:**`, `${kekw}`)
  .addField(`**Last Google Search:**`, `${dam}`)
  .addField(`**Sold Info For:**`, `\`${RANDOM_NUMBER}\`:dollar:`)

    let time8 = '21s'
    setTimeout(function(){ 
    msg.edit(embed);
  }, ms(time8));
await db.add(`money_${user.id}`, RANDOM_NUMBER)
    }
    else{
        let msg = await message.channel.send(`Hacking ${tohack.displayName}....`);

        let time = '1s'
        setTimeout(function(){
        msg.edit(`Finding ${tohack.displayName}'s Email and Password.....`);
      }, ms(time));
    
        let time1 = '4s'
        setTimeout(function(){
        msg.edit(`E-Mail: ${tohack.displayName}@${hahahaha} \nPassword: ********`);
      }, ms(time1));
    
    
        let time3 = '7s'
        setTimeout(function(){
        msg.edit("Setting up Epic Games Account.....");
      }, ms(time3));
    
        let time4 = '9s'
        setTimeout(function(){
        msg.edit("Hacking Epic Games Account......");
      }, ms(time4));
    
        let time5 = '13s'
        setTimeout(function(){
        msg.edit("Hacked Epic Games Account!!");
      }, ms(time5));
    
        let time6 = '16s'
        setTimeout(function(){
        msg.edit("Collecting Info.....");
      }, ms(time6));
    
        let time7 = '18s'
        setTimeout(function(){
        msg.edit("Selling data to FBI....");
      }, ms(time7));
      let d = '21s'
      setTimeout(function(){
      msg.edit(`Looks like the FBI didn't like you so you ended up losing \`${RANDOM_NUMBER}\`:dollar:`);
    }, ms(d));
    await db.subtract(`money_${user.id}`, RANDOM_NUMBER)
    }
  }
}