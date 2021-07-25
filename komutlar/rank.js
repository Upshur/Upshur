const Levels = require('discord-xp');
const Canvas = require('discord-canvas');
const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
    const target = message.mentions.members.first() || message.member;

    const user = await Levels.fetch(target.id, message.guild.id);

    const neededXp = Levels.xpFor(parseInt(user.level) + 1);

    if (!user) return message.reply('Kullanıcının xp\'si bulunmuyor. Daha sonra tekrar deneyiniz.')

    const rep = db.get(`reputation-${target.id}-${message.guild.id}`)

    const image = await new Canvas.RankCard()
    .setAvatar(target.user.displayAvatarURL({ format: 'png' }))
    .setXP("current", user.xp)
    .setXP("needed", neededXp)
    .setLevel(user.level)
    .setReputation(rep)
    .setRankName("Lucifer") // Burayı istediğinizi yazabilirsiniz.
    .setUsername(target.user.username)
    .setBadge(1, "gold") // Badge kısımlarını silebilirsiniz.
    .setBadge(3, "diamond")
    .setBadge(5, "silver")
    .setBadge(6, "bronze")
    .setBackground("https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/11/css-gradient.png?fit=1200%2C600&ssl=1")
    .toAttachment();
 
const attachment = new Discord.MessageAttachment(image.toBuffer(), "rank-card.png");
 
message.channel.send(attachment);
}

exports.conf = {
    aliases: ['rank']
}

exports.help = {
    name: 'level',
    description: 'Levelinizi gösterir.',
    usage: 'level'
}