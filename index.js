const Discord = require('discord.js');
const bot = new Discord.Client();

var servers = {};

const ytdl = require('ytdl-core');

const prefix = '!';

const token = "NjczNTgzNzE1OTA5MTA3NzIz.XjcJ0Q.hVYZLwytrQElSEG467rlAyz_ULI";

const usedCommandRecently = new Set();

bot.on('ready', () => {
    console.log('Bot is Online');
    bot.user.setActivity('AutoDesk Inventor Pro 2020', { type: 'PLAYING' }).catch(console.error);
});
bot.on('message', msg => {
    if (msg.content === "asian") {
        msg.reply('cough cough');
    }
});

bot.on('guildMemberAdd', function (member) {
    let defaultrole = member.guild.roles.find("name", "Homeless");
    member.addRole(defaultrole);
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name == "welcome");
    if (!channel) return;
    channel.send(`Welcome ${member}, to the Homeless Hallway!`)
});

bot.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");



    switch (args[0]) {
        case 'help' :
            message.reply(" !help - sends you commands list.");
            message.reply(" !react - Zuahyr Reacts to you.");
            message.reply(" !ping - Pong!");
            message.reply(" !robotics - sends you robotics competion hunger games link.");
            message.reply(" !Website - sends you a website link.");
            message.reply(" !info version - sends you bot version.");
            message.reply(" !grammerly - sends you grammerly accounts list.");
            message.reply(" !user - shows user information.")
            message.reply("          Mod Commands        ");
            message.reply("!clear - clears messages");
            message.reply("!kick - kicks a user from the server.");
            message.reply("!ban - bans the user from the server.");
            break;
        case 'react':
            message.channel.send('I will rule the world!').then(
            message.react('🤖')
            )
            break;
        case 'cooldown':
            if(usedCommandRecently.has(message.author.id)){
                message.reply('You cannot use that command yet! Wait 3 seconds!')
            }
            else {
                message.reply('You are not on cooldown');
                usedCommandRecently.add(message.author.id);
                setTimeout(() => {
                    usedCommandRecently.delete(message.author.id);
                }, 3000)
            }
            break;
        case 'kick':

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);
                
                if (member) {
                    member.kick('You were kicked from the server!').then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);

                    }).catch(error => {
                        message.reply('Unable to kick Member');
                        console.log(error);
                    });

                } else {
                    message.reply("User is not is this server.")
                }
            } else {
                message.channel.send('You need to specify a person.')
            }
            break;

            case 'ban':
                const banuser = message.mentions.users.first();

                if (banuser) {
                    const member = message.guild.member(banuser);
                    
                    if (member) {
                        member.ban({reason: 'You were banned from the server!'}).then(() =>{
                            message.reply(`${banuser.tag} was banned from the server!`);



                        }).catch(error => {
                            message.reply('Unable to ban Member');
                            console.log(error);
                        });
                    } else {
                        message.reply("User is not is this server.")
                    }
                } else {
                    message.channel.send('You need to specify a person.')
                }
    
                break;

        case 'ping':
            //message.reply('pong!'); //Specific Person
            message.channel.sendMessage('pong!'); //Specific Channel
            break;
        case 'website':
            message.channel.sendMessage('Twitter.com/thgunn3r'); //Specific Channel
            break;
        case 'info':
            if (args[1] == 'version') {
                message.channel.sendMessage('**Version 1.0**'); //Specific Channel
            }
            else {
                message.channel.sendMessage('Invalid Arguments'); //Specific Channel
            }
        case 'clear':
            if (!args[1]) return message.reply('Enter an amount of messages to delete') //Specific Channel
            message.channel.bulkDelete(args[1]);
            break;
        case 'robotics':
            message.channel.sendMessage('http://brantsteele.net/hungergames/r.php?c=c81yhfAU');
            break;
        case 'grammerly':
            message.channel.sendMessage('Here is a list of premium accounts; https://pastr.io/view/7u5Hxz');
            break;
        case 'user':
            const embed = new Discord.RichEmbed()
                .setTitle('User Info')
                .addField('Username', message.author.username)
                .addField('Current Server', message.guild.name)
                .addField("Roles: ", message.member.roles.map(role => role.name).join(", ")) // user, roles
                .setColor(0x5B2C6F)
                .setThumbnail(message.author.avatarURL)
            message.channel.send(embed);
            break;

    }
})


bot.login(process.env.token);