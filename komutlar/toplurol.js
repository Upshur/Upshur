
const Discord = require("discord.js");
const prettyMilliseconds = require('pretty-ms');

exports.run = async (client, message, args) => {
    const error = (str) => message.channel.send(new Discord.MessageEmbed().setColor('RED').setTitle('Hata').setDescription(str));
    const yuzdeHesapla = (p1, p2) => {
        const yapilan = p2 - p1;
        return ((yapilan * 100) / p2).toFixed(2)
    };

    const yaklasikSure = (count) => {
        const toplamSure = 3000 * count;
        const tahminiSureIng = prettyMilliseconds(toplamSure);
        const tahminiSureTr = tahminiSureIng
            .replace(/s/g, ' saniye')
            .replace(/m/g, ' dakika')
            .replace(/h/g, ' saat')
            .replace(/ms/g, ' milisaniye');


        return tahminiSureTr;
    };

    if (!message.member.hasPermission('ADMINISTRATOR')) return error('Bu komudu sadece yönetici kişiler kullanabilir.');
    const option = args[0];
    const options = ['al', 'ver'];
    try {
        switch (option) {
            case 'al':
                if (!args[1]) return error('Bir rol ismi giriniz veya everyone yazınız.');
                const removeFrom = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[1].toLowerCase()));
                if (!removeFrom) return error('Girilen rol bulunamadı.');

                if (!args[2]) return error('Bir rol ismi giriniz veya everyone yazınız.');
                const removeRole = message.mentions.roles.array()[1] || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[2].toLowerCase()));
                if (!removeRole) return error('Girilen rol bulunamadı.');

                if (removeRole.id == message.guild.id) return error('Kişilerden everyone rolünü silemezsiniz.');

                const removeFromFilter = removeFrom.members.filter(m => m.roles.cache.has(removeRole.id));
                const removeFromCount = removeFromFilter.size;
                if (removeFromCount == 0) return error('Seçilen roldeki hiçbir üyede silinecek rol yok!')

                if (message.guild.me.roles.highest.position <= removeFrom.position || message.guild.me.roles.highest.position <= removeRole.position) return error(`Botun yetkisi yetmiyor. Beni ${removeRole} ve ${removeFrom} rollerinden daha yukarıya taşı.`)

                const onayEmbed = new Discord.MessageEmbed().setColor('GREEN').setTitle('Onaylıyor musunuz?')
                    .setDescription(`
                    **${removeFrom} (${removeFromCount} kişi)** rolündeki kişilerden **${removeRole}** rolü silinecek.
                `).setFooter(`işlemin yaklaşık ${yaklasikSure(removeFromCount)} sürede bitmesi tahmin ediliyor.`);

                message.channel.send(onayEmbed).then(m => {
                    m.react('✅');
                    m.react('❌');
                    const emojies = ['✅', '❌'];
                    const filter = (reaction, user) => {
                        return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
                    };

                    const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
                    collector.on('collect', (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case '✅':
                                m.reactions.removeAll();

                                const islemEmbed = new Discord.MessageEmbed()
                                    .setTitle('Toplu Rol Silme')

                                var islemYapilan = 1, kalanKisi = removeFromFilter.size;
                                removeFromFilter.forEach((member) => {
                                    const timeout = setTimeout(() => {
                                        member.roles.remove(removeRole);
                                        m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Silme').setColor('GREEN').addField('Toplam Kaç Kişiden Silinecek', removeFromCount, true).addField('Kaç Kişi Kaldı', kalanKisi).addField('Yüzdelik', `İşlem Yapılan: %${yuzdeHesapla(kalanKisi, removeFromFilter.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalanKisi)} süre kaldı`))
                                        clearTimeout(timeout)
                                        kalanKisi = kalanKisi - 1;
                                        if (kalanKisi == 0) {
                                            m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Silme').setColor('GREEN').setDescription(`**İşlem tamamlandı!** **${removeFrom} (${removeFromCount} kişi)** rolündeki kişilerin hepsinden ${removeRole} rolü alındı.`))
                                        }
                                    }, islemYapilan * 3000);
                                    islemYapilan = islemYapilan + 1;
                                });

                                break;
                            case '❌':
                                m.reactions.removeAll();
                                m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`İşlem kullanıcı isteğiyle iptal edildi.`));
                                break;
                        };
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            m.reactions.removeAll();
                            m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                        }
                    })
                });
                break;
            case 'ver':
                if (!args[1]) return error('Bir rol ismi giriniz veya everyone yazınız.');
                const addTo = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[1].toLowerCase()));
                if (!addTo) return error('Girilen rol bulunamadı.');

                if (!args[2]) return error('Bir rol ismi giriniz veya everyone yazınız.');
                const addRole = message.mentions.roles.array()[1] || message.guild.roles.cache.get(args[2]) || message.guild.roles.cache.find(r => r.name.toLowerCase().includes(args[2].toLowerCase()));
                if (!addRole) return error('Girilen rol bulunamadı.');

                if (addRole.id == message.guild.id) return error('Kişilere everyone rolünü veremezsiniz.');

                const addToFilter = addTo.members.filter(m => !m.roles.cache.has(addRole.id));
                const addToCount = addToFilter.size;
                if (addToCount == 0) return error('Seçilen roldeki bütün üyelerde verilecek rol var!')

                if (message.guild.me.roles.highest.position <= addTo.position || message.guild.me.roles.highest.position <= addRole.position) return error(`Botun yetkisi yetmiyor. Beni ${addRole} ve ${addTo} rollerinden daha yukarıya taşı.`)

                const onay1Embed = new Discord.MessageEmbed().setColor('GREEN').setTitle('Onaylıyor musunuz?')
                    .setDescription(`
                    **${addTo} (${addToCount} kişi)** rolündeki kişilere **${addRole}** rolünü verecek.
                `).setFooter(`işlemin yaklaşık ${yaklasikSure(addToCount)} sürede bitmesi tahmin ediliyor.`);

                message.channel.send(onay1Embed).then(m => {
                    m.react('✅');
                    m.react('❌');
                    const emojies = ['✅', '❌'];
                    const filter = (reaction, user) => {
                        return emojies.includes(reaction.emoji.name) && message.author.id == user.id;
                    };

                    const collector = m.createReactionCollector(filter, { max: 1, time: 30000 })
                    collector.on('collect', (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case '✅':
                                m.reactions.removeAll();

                                const islemEmbed = new Discord.MessageEmbed()
                                    .setTitle('Toplu Rol Verme')


                                var islemYapilan = 1, kalanKisi = addToFilter.size;
                                addToFilter.forEach((member) => {
                                    const timeout = setTimeout(() => {
                                        member.roles.add(addRole);
                                        m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Verme').setColor('GREEN').addField('Toplam Kaç Kişiye Verilecek', addToCount, true).addField('Kaç Kişi Kaldı', kalanKisi).addField('Yüzdelik', `İşlem Yapılan: %${yuzdeHesapla(kalanKisi, addToFilter.size)}`).setFooter(`yaklaşık ${yaklasikSure(kalanKisi)} süre kaldı`))
                                        clearTimeout(timeout)
                                        kalanKisi = kalanKisi - 1;
                                        if (kalanKisi == 0) {
                                            m.edit(new Discord.MessageEmbed().setTitle('Toplu Rol Verme').setColor('GREEN').setDescription(`**İşlem tamamlandı!** **${addTo} (${addToCount} kişi)** rolündeki kişilerin hepsine ${addRole} rolü verildi.`))
                                        }
                                    }, islemYapilan * 3000);
                                    islemYapilan = islemYapilan + 1;
                                });

                                break;
                            case '❌':
                                m.reactions.removeAll();
                                m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`İşlem kullanıcı isteğiyle iptal edildi.`));
                                break;
                        };
                    });

                    collector.on('end', collected => {
                        if (collected.size == 0) {
                            m.reactions.removeAll();
                            m.edit(new Discord.MessageEmbed().setColor('RED').setDescription(`30 saniye içerisinde işlem yapılmadığı için işlem iptal edildi.`));
                        }
                    })
                });
                break;
            default:
                error(`Lütfen bir opsiyon belirtin.\n\n\`• !tr ver <hangiRoldekiÜyelereVerilecek> <verilecekRol>\`\n\`• !tr al <hangiRoldekiÜyelerdenAlınacak> <alınacakRol>\``);
        }
    } catch (err) {
        error('Bir hata oluştu..');
        console.error(err);
    };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tr', 'toplu-rol'],
    permLevel: 0
};

exports.help = {
    name: 'toplurol',
    description: 'Toplu rol alıp verme sistemi, laura tarafından yapıldı.'
};

// lauraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
// CodAre 

