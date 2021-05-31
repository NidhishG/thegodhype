const { DiscordAPIError } = require('discord.js')
const db = require('quick.db')
const { ReactionPages } = require('reconlx')
module.exports = {
    config:{
        name: 'getchar',
        aliases: ['getcharacter'],
        description: 'drop a card to add to your collection'
    },
    async run(bot, message, args){
        const embed = new DiscordAPIError.Messa

        
        const pages = [embed, embedd]
        ReactionPages(message, pages, true)

    }
}