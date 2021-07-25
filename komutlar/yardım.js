
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {


  const embed = new Discord.MessageEmbed()
  .setTimestamp()
  .setColor("BLACK")
  .setDescription(`Botun kurallarını kabul ediyor musun ?`)
  message.channel.send(embed).then(async function(sentEmbed) {
    const emojiArray = ["♣"];
    const filter = (reaction, user) =>
      emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
    await sentEmbed.react(emojiArray[0]).catch(function() {});
    var reactions = sentEmbed.createReactionCollector(filter, {
      time: 30000
    });
    reactions.on("end", () => sentEmbed.edit("İşlem iptal oldu!☺"));
    reactions.on("collect", async function(reaction) {
      if (reaction.emoji.name === "♣") {

        
        message.channel.send(`
        
      
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        `);
      
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
      }
    });
  });
};

module.exports.conf = {
  aliases: [],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "yardım",
  description: "onaylamalı yardım",
  usage: "!virusuntaşaklarınakurban"
};