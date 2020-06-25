const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`Altyapı yapımcısı: TheClawNz.rht#6717`)
  client.user.setStatus("online");
  var oyun = [
    "WhYBoLu Code v12 boş altyapı"
  ];

  setInterval(function() {
    var random = Math.floor(Math.random() * (oyun.length - 0 + 1) + 0);

    client.user.setActivity(oyun[random], "");
  }, 2 * 2500);
};
