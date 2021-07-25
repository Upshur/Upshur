const discord = require('discord.js');
const Database = require("plasma-db");
const db = new Database("./botlist.json"); 
exports.run = async(client, message, args) => {
    let yetkili = db.fetch(`testerrol_${message.guild.id}`)
    if(!message.member.roles.cache.has(yetkili)&& !message.member.hasPermission("ADMINISTATOR")) return message.channel.send('Sen yetkili değilsin')
    let eng = args[0] 
    let engi = args[1] 
if(!eng) return message.channel.send('Lütfen reddetmek istediğin botun sahibininin idini at')
if(!engi) return message.channel.send('Lütfen reddetmek istediğin botun  idini at ')
let engin = db.fetch(`başvurulog_${message.guild.id}`)
let engin2 = db.fetch(`yetkililog_${message.guild.id}`)
const embed = new discord.MessageEmbed()
.setTitle('Bir yetkili bot reddetti!')
.setDescription(`<@${message.author.id}> adlı yetkili az önce <@${eng}> adlı kişinin <@${engi}> adlı botunu reddetti!`)
.setColor('RANDOM')
client.channels.cache.get(engin).send(`<@${eng}> adlı kişinin <@${engi}> adlı botu <@${message.author.id}> tarafından reddedildi!`)
client.channels.cache.get(engin2).send(embed)
message.channel.send('Bot reddedildi!')
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [],
permLevel: 0


};
exports.help = {
    name : "bot-reddet"
    
    };