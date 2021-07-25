
const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
let prefix = ayarlar.prefix

exports.run = async (client, message, args) => { 
  
  const codwa = new Discord.MessageEmbed()
  .setColor("BLACK")
  .setTitle('𝐄𝐯𝐨𝐥𝐯𝐞-𝐲𝐚𝐫𝐝ı𝐦 𝐦𝐞𝐧ü𝐬ü')
  .setDescription(`\n **${prefix}moderasyon** : Moderasyon Menüsünü Açarsınız.\n\n  **${prefix}eğlence** : Eğlence Menüsünü Açarsınız.\n\n **${prefix}botlist** : Botlist komutlarını açarsınız.\n\n **${prefix}davet**: Botun davet linkini atar.`)
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