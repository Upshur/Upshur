const discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./botlist.json"); 
exports.run = async(client, message, args) => {
    let kanal = db.fetch(`başvuruk_${message.guild.id}`)
    if (!message.channel.id !== kanal) return message.channel.send(`Bu komutu sadece bot ekleme kanalında kullanabailirsin!`)
    if (message.channel.id == kanal) {
message.delete()
    let eng = args[0] 
    let engi = args[1]
  let engin = args[2]
  if(!eng) return message.channel.send('Botunun idini yaz')
  if(!engi) return message.channel.send('Botunun prefixini yaz')
  if(!engin) return message.channel.send('Botunun dbl onay durumunu yaz')
let log = db.fetch(`başvurulog_${message.guild.id}`)
client.channels.cache.get(log).send(`<@${message.author.id}>`)
const embed = new discord.MessageEmbed()
.setTitle('Yeni bir başvuru var!')
.setDescription(`<@${message.author.id}> <@${eng}> adlı botu ile başvuru yaptı!  \n Botun prefixi: ${engi} \n Dbl onay durumu: ${engin}\n \n [Eklemek için tıkla!](https://discordapp.com/oauth2/authorize?client_id=${eng}&scope=bot&permissions=0)`)
client.channels.cache.get(log).send(embed)
message.channel.send(`Bot ekleme isteğiniz alındı!!!`)
message.delete()
};
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [],
permLevel: 0


};
exports.help = {
    name : "bot-ekle"
    
    };