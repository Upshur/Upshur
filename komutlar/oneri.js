const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {
 
    var ökanal = await db.fetch(`önerikanal_${message.guild.id}`)
    var önerikanalı = message.guild.channels.cache.find(channel => channel.id === ökanal)
    if (!ökanal) return message.channel.send(":uzgunn1: **Maalesef Bir Öneri Kanalı Ayarlanmamış.** :developer: `Ayarlamak İçin !!öneri-kanal #kanal` ")

var oneri = args.join(" ").slice(0)
if (!oneri) {
    message.channel.send("**:uzgunn1: Hey Dostum Yanlış Kullanıyorsun. Merak Etme Ben Burdayım :kopke:** \n :developer: `Örnek: !!öneri Dragona Oy Vermeyen Banlansın`")
  
  return
} else {
    const embed = new Discord.MessageEmbed()
    .setTitle("Yeni Bir Öneri Var!")
    .addField(":krmzyildiz: Öneren Kullanıcı:", `${message.author.tag}`)
    .addField(`:krmztik: Öneri`, oneri)
  .setColor("RED")
     .setTimestamp()
.setThumbnail(client.user.displayAvatarURL()) 
.setFooter(`Dragon Corpation©`)
    
önerikanalı.send(embed).then(m => {
    m.react("⬆️")
    m.react("⬇️")})
}

  message.channel.send(`:beyaztik: **Öneriniz başarıyla alındı!** \n :hype: _Önerin ${önerikanalı} kanalına düştü_`)

 } 
 
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["istek"],
 permLevel: 0
}
exports.help = {
 name: 'öneri',
 description: 'ö',
 usage: 'ö'
};