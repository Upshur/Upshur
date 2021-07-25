const db = require('quick.db');

exports.run = async (client, message, args) => {
    let user = message.mentions.members.first();

    if (user.id === message.author.id) return message.reply('Kendine itibar puanı ekleyemezsin!');

    db.add(`reputation-${user.id}-${message.guild.id}`, 1)
    message.channel.send(`${user.displayName} adlı kullanıcıya 1 itibar puanı eklediniz.`)
}

exports.conf = {
    aliases: ['reputation', 'rep']
}

exports.help = {
    name: 'itibar',
    description: 'Kullanıcıya itibar puanı eklersiniz.',
    usage: 'itibar'
}