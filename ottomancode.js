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


///syç

client.on("guildMemberAdd", message => {
client.guilds.get("844184868111777812").setName(`CodAre { ${message.guild.memberCount} }`);
});

client.on("guildMemberRemove", message => {  
client.guilds.get("844184868111777812").setName(`CodAre { ${message.guild.memberCount} }`);
});

///rsmlhgbb

client.on('guildMemberAdd',async member => {
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 50;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 7}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
  let user = client.users.cache.get(member.id);
  let kanalveri = await db.fetch(`gelenKanal_${member.guild.id}`)
    const canvas = Canvas.createCanvas(700,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const background = await Canvas.loadImage('Arka plan resimi');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format:"png"}));
    ctx.fillStyle = "#fff"
    ctx.font = '30px serif';
    ctx.fillText('Kullanıcı Katıldı!', 240, 130, 500);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
      ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
      ctx.font = applyText(canvas, `${user.tag}`);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt Impact';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'DreamCode-Hosgeldin.png');
   member.guild.channels.cache.get(kanalveri).send(attachment)
   }
})

client.on('guildMemberRemove',async member => {
  const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 50;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 7}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
  let user = client.users.cache.get(member.id);
  let kanalveri = await db.fetch(`gelenKanal_${member.guild.id}`)
    const Canvas = require('canvas')
    const canvas = Canvas.createCanvas(700,300);
    const ctx = canvas.getContext('2d');
      if(member.user.bot) {return;}
   if (!member.bot){
    const background = await Canvas.loadImage('Arka plan resimi');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({format:"png"}));
    ctx.fillStyle = "#fff"
    ctx.font = '30px serif';
    ctx.fillText('Kullanıcı Ayrıldı!', 240, 130, 500);
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.shadowBlur = 10;
    ctx.font = applyText(canvas, `${user.tag}`);
      ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
      ctx.font = applyText(canvas, `${user.tag}`);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`${user.tag}`, canvas.width / 3.0, canvas.height / 1.5);
    ctx.font = '30pt Impact';
    ctx.fillStyle = "#263238"
    ctx.shadowColor = '#263238';
    ctx.fill()
    ctx.beginPath();
    ctx.ellipse(130, 160, 100, 100, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(avatar, 30, 60, 220, 220);
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'DreamCode-GuleGule.png');
   member.guild.channels.cache.get(kanalveri).send(attachment)
   }
})
































































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
