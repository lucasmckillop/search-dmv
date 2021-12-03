const config = require('../config.json')
const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    message.delete()
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!member) {
        let e1 = new MessageEmbed()
            .setDescription(`Please make sure to mention a valid user!`)
            .setColor(config.embed.color)
            .setFooter(config.embed.footer)
        message.channel.send(e1).then(msg => msg.delete({ timeout: 10000 }));
    } else {
        connection.query(`SELECT * FROM vehicle WHERE discord = '${member.id}'`, (err, reslove) => {
            if (err) {
                let e2 = new MessageEmbed()
                    .setDescription(`I had an error checking the database`)
                    .setColor(config.embed.color)
                    .setFooter(config.embed.footer)
                message.channel.send(e2)
            } else {
                let embed = new MessageEmbed();
                embed.setColor(config.embed.color)
                embed.setFooter(config.embed.footer)
                embed.setDescription(`Below are the DMV Results for ${member.user.tag} (ID: ${member.user.id})\n\nThe number in the brackets after the plate is the Vehicle ID.`)
                embed.setTimestamp()
                reslove.forEach(veh => {
                    embed.addField(`Name`, `${veh.first} ${veh.last}`, true)
                    embed.addField(`Type`, veh.type, true)
                    embed.addField(`Plate`, `${veh.plate} (${veh.vecid})`, true)
                })
                message.channel.send(embed)
            }
        })

    }
}

module.exports.help = {
    name: "dmv",
    description: "Shows the users registered vehicles.",
    usage: "",
    category: "Mod",
    aliases: []
};
