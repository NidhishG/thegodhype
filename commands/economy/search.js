const db = require('quick.db')

module.exports = {
    config:{
  name: "search",
  description: "search some stuff!",
  category: "Economy",
    },

run: async (bot, message, args) => {  
      const discord = require('discord.js')
      const LOCATIONS = [
        "car",
        "sock",
        "milk",
        "wallet",
        "box",
        "pocket",
        "bus",
        "gutters",
        "park",
        "train",
        "lounge",
        "keyboard",
        "picnic",
        "bathroom",
        "bed",
        "sofa",
        "backpack",
        "laptop",
        "oculus",
        "shirt",
        "discord",
        "dresser",
        "duffel bag",
        "john wick's dog"
      ];
  
      let chosenLocations = LOCATIONS.sort(() => Math.random() - Math.random()).slice(0, 3);
  
      const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 150;
  
      const FILTER = (m) => {
        return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
      };
  
      const COLLECTOR = message.channel.createMessageCollector(FILTER, { max: 1, time: 15000 });
  
      COLLECTOR.on("collect", async (m) => {
        const EMBED = new discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle(`${message.author.username} searched a ${m.content} 🕵️`)
          .setDescription(`You found 💵 ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
          .setFooter(`A true detective you are.`);
  
        db.add(`money_${message.author.id}`, RANDOM_NUMBER)
  
        message.channel.send(EMBED);
      });
  
      COLLECTOR.on("end", (collected) => {
        if (collected.size == 0) {
          return message.channel.send(
            `What are you doing <@${message.author.id}>?! There was 💵${RANDOM_NUMBER.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )} hidden inside the ${chosenLocations[0]} 😭`
          );
        }
      });
  
      message.channel.send(
        `<@${
          message.author.id
        }>\n**Which location would you like to search?** 🔍\nType the location in this channel.\n\`${chosenLocations.join("` `")}\``
      );
    },
  };