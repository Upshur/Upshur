
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { 
  
  const codwa = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setTitle('Evolve - Yardım Menüsü')
  .setDescription(`\n **${prefix}moderasyon** : Moderasyon Menüsünü Açarsınız.\n\n  **${prefix}eğlence** : Eğlence Menüsünü Açarsınız.\n\n **${prefix}istatistik** : Bot hakkında bilgi verir.\n\n **${prefix}davet**: Botun davet linkini atar.`)
  .setImage('koymak istediğiniz görselin linki')
message.channel.send(codwa)
}

exports.conf = {
  enabled: false,
  guildOnly: false,
  permLevel: 0,
  aliases: ['help', 'h', 'y', 'yardım']
}

exports.help = {
  name: 'yardım',
  description: 'codwa & ottomancode',
  usage: 'yardım'
}