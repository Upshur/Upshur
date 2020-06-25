//BU ALTYAPI WHYBOLU CODEYE AİTTİR ÇALINMASI YASAKTIR!
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const yardım = new Discord.MessageEmbed()
  .setAuthor("MC-AT")
  .setTitle("MC-AT BOT")
  .setUrl("destek sunucunuz")
  .setDescription("**!yardım**, ile yardım alabilirsiniz.\n Örnek komut kullanımı: `!küfüraç`\n Botu davet etmek için: `!davet`")
  .addField("**!komutlar (16)**", "herkesin kullanabileceği standart komutlar;\n`botbilgi``davet``premium``premiumkullan``oyver``gold``webpanel``sunucu-pp``profil``kredim``p-market``p-menü``avatar``puanım``ekran-paylaş``manşet``opkasa``ayarlar`")
  .addField("**!eğlence (9)**", "herkesin kullanabileceği eğlence komutları;\n`kralol``maymunol``yılanol``adamol``kediol``aşk``token``tokat`")
  .addField("**!moderasyon (13)**", "yetkililer için moderasyon komutları;\n`küfür``reklam``link engel``büyük harf engel``reklam kick``reklam isim ban``oto rol``sayaç``ban koruma sistemi``duyuru``oto cevap``mute sistemi`")
  .addField("**!moderasyon 2 (12)**", "yetkililer için moderasyon komutlarının 2.bölümü;\n`sil``reklam taraması``resimli hg bb``sunucu tanıt``oto bot silici``ultra sohbet temizleyici``yavaş mod``duyuru``tag sistemi``rol sistemi``geçici oda sistemi``kayıt sistemi`")
  .addField("**!koruma (6)**", "Sunucunuz için Koruma Sistemleri.\n`sağ tık ban koruması``kanal silme koruması``Yönetici Verme Koruması``rol silme koruması``anti raid bot sistemi``güvenlik odası`")
  .addField("**Language Settings (1)**", "`!lang <code>`")
  .addField("Webpanel", "[Tıkla](https://www.mcadventuretime.com/dc/)")
  .setFooter("© Mcadventuretime.com")
  .setTimestamp()
  message.channel.send(yardım)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["help"],
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'MC-AT Yardım',
  usage: 'yardım'
};
//BU ALTYAPI WHYBOLU CODEYE AİTTİR ÇALINMASI YASAKTIR!