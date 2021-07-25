const Discord = require ("discord.js")

exports.run = async (client, message, args) => {
  
  
  const sunucusayısı = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle("Bulunduğum Sunucu Sayısı;")
  .addField("**Sunucular**", client.guilds.cache.size.toLocaleString(), true)
  message.channel.send(sunucusayısı)
  
  
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [""],
};

exports.help = {
  name: "sunucu-sayısı",
  description: "botun kaç tane sunucuda olduğunu gösterir",
  usage: "!sunucu-sayısı işte nolcak başka"
};