const discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./botlist.json"); 
exports.run = async(client, message, args) => {
const enginar = message.mentions.channels.first()
if(!enginar) return message.channel.send('Lütfen yetkili log kanalını belirt!')
db.set(`yetkililog_${message.guild.id}`, enginar.id)
const embed = new discord.MessageEmbed()
.setTitle('Başarı ile ayarlandı!')
.setDescription(`yetkili log kanalı az önce <#${enginar.id}> olarak ayarlandı!`)
.setColor('RANDOM')
return message.channel.send(embed)
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [],
permLevel: 4


};
exports.help = {
name : "yetkili-log"


};