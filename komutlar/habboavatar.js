const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  
  message.delete();
  
  let Hotel = args.slice(0)
  let İsim = args.slice(1)
  let Eylem = args.slice(2)
  let Vücut = args.slice(3)
  let Kafa = args.slice(4)
  let Surat = args.slice(5)
  let Boyut = args.slice(6)
  
  const Mesaj = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle(`"${args[1]}" adlı kullanıcının\nHabbo avatarı:`)
    .setThumbnail(client.user.avatarURL)
    .setImage(`www .habbo.` + `${args[0]}` + `/habbo-imaging/avatarimage?user=` + `${args[1]}` + `&action=` + `${args[2]}` + `&direction=` + `${args[3]}` + `&head_direction=` + `${args[4]}` + `&gesture=` + `${args[5]}` + `&size=` + `${args[6]}`)
  message.channel.send(Mesaj)
  };
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['habbo-avatar', 'habboavatar'],
    permLevel: 0
};
exports.help = {
  name: 'Habbo-Avatar'
}