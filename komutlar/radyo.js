const Discord = require("discord.js");

exports.run = async (client, message, args) => {//hamzamertakbaba#3575

    if (!message.member.voice.channel) return message.channel.send(`${message.author} Çok akıllısın. Sesli odada olmadan nasıl radyo dinlemeyi düşünüyorsun?`).then(m => m.delete({ timeout: 5000 }));

    if (args[0] === "durdur") {
        if (message.guild.me.voice.channel === null) return message.channel.send(`${message.author} Radyoyu durdurmak için önce bir radyo açman gerek.`).then(m => m.delete({ timeout: 5000 }));
        message.guild.me.voice.channel.leave()
        return message.react("👋")
    }
    message.channel.send("⠀⠀⠀⠀⠀⠀⠀⠀").then(radio => {
        radio.react('1️⃣')
        radio.react('2️⃣')
        radio.react('3️⃣')
        radio.react('4️⃣')
        setTimeout(() => {
            let Embed = new Discord.MessageEmbed()
                .setAuthor("Hangi radyoyu açmak istersiniz?")
                .setColor("36393f")
                .setDescription(`\`1️⃣ Radyo Fenomen\` \n\`2️⃣ Alem FM\` \n\`3️⃣ PowerHitz\` \n\`4️⃣ VIRGIN Radyo\` \nBu kadar dinlemek yeterli diyorsan \`!radyo durdur\` komutu ile radyoyu durdurabilirsin.`)
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
            radio.edit(Embed)
        }, 1500)
        const Collector = radio.createReactionCollector((reaction, user) =>
            reaction.emoji.name === "1️⃣" || "2️⃣" || "3️⃣" || "4️⃣" &&
            user.id === message.author.id,
            {
                time: 60000,
                errors: ['time']
            });
        Collector.on("collect", async (reaction, user) => {
            if (user.id === client.user.id) return;
            if (reaction.emoji.name === "1️⃣") {
                await radio.reactions.removeAll()
                await Collector.stop()
                let Embed = new Discord.MessageEmbed()
                    .setAuthor("Radyo Fenomen", "https://i.hizliresim.com/plnrtoj.png")
                    .setColor(`36393f`)
                    .setDescription(`Şu anda \`Radyo Fenomen\` çalınıyor.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                if (message.member.voice.channel.join()
                    .then(connection => {
                        const dispatcher = connection.play("https://listen.radyofenomen.com/fenomen/256/icecast.audio");
                        return radio.edit(Embed)
                    }));
            }

            if (reaction.emoji.name === "2️⃣") {
                await radio.reactions.removeAll()
                await Collector.stop()
                let Embed = new Discord.MessageEmbed()
                    .setAuthor("Alem FM", "https://i.hizliresim.com/cp6mppl.png")
                    .setColor(`36393f`)
                    .setDescription(`Şu anda \`Alem FM\` çalınıyor.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                if (message.member.voice.channel.join()
                    .then(connection => {
                        const dispatcher = connection.play("http://turkmedya.radyotvonline.com/turkmedya/alemfm.stream/playlist.m3u8");
                        return radio.edit(Embed)
                    }));
            }

            if (reaction.emoji.name === "3️⃣") {
                await radio.reactions.removeAll()
                await Collector.stop()
                let Embed = new Discord.MessageEmbed()
                    .setAuthor("PowerHitz", "https://i.hizliresim.com/mkkv319.png")
                    .setColor(`36393f`)
                    .setDescription(`Şu anda \`PowerHitz\` çalınıyor.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                if (message.member.voice.channel.join()
                    .then(connection => {
                        const dispatcher = connection.play("http://powerhitz.powerhitz.com:5010/");
                        return radio.edit(Embed)
                    }));
            }

            if (reaction.emoji.name === "4️⃣") {
                await radio.reactions.removeAll()
                await Collector.stop()
                let Embed = new Discord.MessageEmbed()
                    .setAuthor("VIRGIN Radyo", "https://i.hizliresim.com/pi07yse.png")
                    .setColor(`36393f`)
                    .setDescription(`Şu anda \`VIRGIN Radyo\` çalınıyor.`)
                    .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTimestamp()
                if (message.member.voice.channel.join()
                    .then(connection => {
                        const dispatcher = connection.play("https://17703.live.streamtheworld.com/VIRGIN_RADIO.mp3");
                        return radio.edit(Embed)
                    }));
            }
        })
    })

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};
exports.help = {
    name: "radyo",
};