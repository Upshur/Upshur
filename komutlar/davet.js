const  Discord = require("discord.js"); 

exports.run = (client, message, args) => {

  const davet = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Davet Menüsü")
  .setDescription("[__**Botu Davet Et**__](https://discord.com/oauth2/authorize?client_id=793191555817144360&scope=bot&permissions=805314622) \n [__**Destek Sunucusu**__](https://discord.gg/czY4HCZKY6)")
  message.channel.send(davet)
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: '',
  usage: ''
};