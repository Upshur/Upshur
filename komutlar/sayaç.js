const Discord = require('discord.js');
const qdb = require('quick.db');
exports.run = async(client, message, args) => {
    if(args[0] !== "sıfırla"){
      var kanal = message.mentions.channels.first();
      if(!kanal) return message.reply("kanalı ayarla aq")
      var sayı = args[1]
      if(!sayı) return message.reply("sayacı kafamdan random mu tutucam oç sayı belirle qweqweqw")
      if(isNaN(sayı)) return message.reply("kanka sayı gir dedik sayı **SAYI** HARF DEİL GERİZEKALI")
      if(sayı < message.guild.memberCount) return message.reply("Sunucun hedef sayaçtan daha büyük amk")
      qdb.set(`sayackanali_${message.guild.id}`, kanal.id)
      qdb.set(`sayachedef_${message.guild.id}`, sayı)
      return message.reply("Sayaçı ayarladım bro!")
    }
    if(args[0] === "sıfırla"){
      qdb.delete(`sayackanali_${message.guild.id}`)
      qdb.delete(`sayachedef_${message.guild.id}`)
      return message.reply("sıfırladm aşkm muah")
    }
}
module.exports.conf = {permLevel: 3, aliases: []}; module.exports.help = {name: "sayaç"}
