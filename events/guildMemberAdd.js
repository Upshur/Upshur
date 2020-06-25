const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberAdd", (member, message) => {
  member.send(`Sunucumuza hoşgeldin seninle birlikte ${message.guild.memberCount} Kişiyiz!`)
})