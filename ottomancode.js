const Discord = require('discord.js');
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const qdb = require('quick.db');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "OttomaN Destek & Botlist & Code v12 Altyapı Başarıyla Hostlandı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
///fake katıl

client.on('message', async message => {
if (message.content === 'fakekatıl') { // Buraya ne yazarsanız yazdığınız şeye göre çalışır
  client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
    }
});

///fake ayrıl

client.on('message', async message => {
if (message.content === 'fakeayrıl') { // Buraya ne yazarsanız yazdığınız şeye göre çalışır
  client.emit('guildMemberRemove', message.member || await message.guild.fetchMember(message.author));
    }
});

///sese sokma

client.on("ready", async () => {
  console.log("Bot Başarıyla Ses Kanalına Bağlandı")
  let botVoiceChannel = client.channels.cache.get("861662391813406730");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
});

///reklam-engel

client.on("message", msg => {
let db = require('quick.db')
 let e = db.fetch(`reklamengel_${msg.guild.id}`)
if(e === "aktif"){  
      const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
        if (reklam.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();
                         const batusuyar = new Discord.MessageEmbed()
.setColor('RED')
.setTitle("Reklam Engel Filtresi")
.setDescription(`Sunucuda Reklam Engel Filtresi Açık Reklam Yapamazsın <@${msg.authorid}>`)
                         
    
                    return msg.channel.send(batusuyar).then(msg => msg.delete(3000));
   
 
  msg.delete(3000);                              
 
            }              
          } catch(err) {
            console.log(err);
          }
        }}
else return;
    });
///sayaç

client.on("guildMemberAdd", member => {
var kanal = qdb.fetch(`sayackanali_${member.guild.id}`)
if(!kanal) return;
var hedef = qdb.fetch(`sayachedef_${member.guild.id}`)
if(!hedef) return;
client.channels.cache.get(kanal).send(`${member} ♥ Sunucuya katıldı! Hedefimize ulaşmamıza ${hedef - member.guild.memberCount} kişi kaldı!`)
if(hedef <= member.guild.memberCount){
  client.channels.cache.get(kanal).send(`☺ Hedefimizi başardık! Sunucumuz ${hedef} kişiye ulaştı!`)
  qdb.delete(`sayackanali_${member.guild.id}`)
  qdb.delete(`sayachedef_${member.guild.id}`)
}
})
client.on("guildMemberRemove", member => {
var kanal = qdb.fetch(`sayackanali_${member.guild.id}`)
if(!kanal) return;
var hedef = qdb.fetch(`sayachedef_${member.guild.id}`)
if(!hedef) return;
client.channels.cache.get(kanal).send(`${member.user.tag} ♦ sunucudan ayrıldı! Hedefimize ulaşmamıza ${hedef - member.guild.memberCount} kişi kaldı!`)
})

///seviye sistemi

const Levels = require('discord-xp');

Levels.setURL('MONGODB URL');

client.on('message', async message => {
    if (!message.guild) return;
    if (message.author.bot) return;

    const randomXp = Math.floor(Math.random() * 9) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`Tebrikler ${message.author}, ${user.level} Leveline atladın!`);
    }
})

///otorol




































































client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
