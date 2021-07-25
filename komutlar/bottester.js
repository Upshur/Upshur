const discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./botlist.json"); 
exports.run = async(client, message, args) => {
const enginar = message.mentions.roles.first()
if(!enginar) return message.channel.send('Lütfen tester rolünü belirt!')
db.set(`testerrol${message.guild.id}`, enginar.id)
const embed = new discord.MessageEmbed()
.setTitle('Başarı ile ayarlandı!')
.setDescription(`Bot tester rolü az önce <@&${enginar.id}> olarak ayarlandı!`)
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
name : "tester-rol"


};