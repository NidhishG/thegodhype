const db = require('quick.db');

module.exports = {
    config:{
        name: 'antiinvite',
        aliases: [],
        category: 'moderation',
        description: 'Enables Server AntiInvite',
        usage: ' ',
        accessableby: 'Administrators',
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")

        try {
            let a = await db.fetch(`antiinv_${message.guild.id}`)

            if (a) {
                return message.channel.send("**Anti Invite it already on!**")
            } else {
                db.set(`antiinv_${message.guild.id}`, 1)

                message.channel.send("**Anti Invite is Enabled Successfully!**")
            }
            return;
        } catch (e) {
            console.log(e)
            return message.channel.send("**Something Went Wrong!**")
        }
    }
}