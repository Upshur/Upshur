const Discord = require('discord.js');
const database = require('quick.db');

exports.run = async (client, message, args) => {// can#0002

let channel = message.channel;
if(!args[0]) return message.channel.send('Bir kullanıcıyı etiketlemelisin.');
if(!message.mentions.members.first()) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!member) return message.channel.send('Etiketlediğin kullanıcıyı bulamıyorum.');
if(args[1]) {
if(!message.mentions.channels.first()) return message.channel.send('Etiketlediğin kanalı bulamıyorum.');
channel = message.mentions.channels.first();
};
var i = 0;
message.delete();
channel.messages.fetch().then(x => {
x.filter(a => a.author.id === member.user.id).map(a => a).slice(0, 100).forEach(s => {
i++
s.delete();
if(i === x.filter(a => a.author.id === member.user.id).map(a => a).slice(0, 100).length) {
return message.channel.send(`**${i}** mesaj silinecek.`);
}
});
});


};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'sil'
};// codare ♥