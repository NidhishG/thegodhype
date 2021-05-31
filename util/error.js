const { MessageEmbed } = require("discord.js")

/**
 * Easy to send errors because im lazy to do the same things :p
 * @param {String} text - Message which is need to send
 * @param {TextChannel} channel - A Channel to send error
 */
module.exports = async (text, channel) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter("(https://emoji.gg/assets/emoji/6403_pixel_x.png)](https://emoji.gg/emoji/6403_pixel_x) Oops something went wrong :(")
    await channel.send(embed)
}