const{
    Client,
    Attachment

} = require('discord.js');
const bot = new Client();

const ytdl = require('ytdl-core');

const prefix = '!';

const token = "private :> ";

const usedCommandRecently = new Set();


bot.on('ready', () => {
    console.log('Bot is Online');
    bot.user.setActivity('DEPRESSION SIMULATOR', { type: 'PLAYING' }).catch(console.error);
});


bot.on('guildMemberAdd', member => {
    
    const channel = member.guild.channels.find(channel => channel.name == "welcome");
    if (!channel) return;
    channel.send(`Welcome ${member}, to the Homeless Hallway!`);
    let memberRole = member.guild.roles.find("name","Homeless");
    member.addRole(memberRole);
    
});

bot.on('message', message => {

    if(message.content.includes('Sohaib'.toLowerCase)) {
        message.channel.sendMessage('sohaib');
        message.channel.sendMessage('haha'); 
        message.channel.sendMessage('funny guy'); 
        message.channel.sendMessage(':thumbsup:'); 
        
    }

    let args = message.content.substring(prefix.length).split(" ");



    switch (args[0]) {
        case 'help' :
            message.author.send("-!help - sends you commands list.");
            message.author.send("-!react - Zuahyr Reacts to you.");
            message.author.send("-!ping - Pong!");
            message.author.send("-!robotics - sends you robotics competion hunger games link.");
            message.author.send("-!Website - sends you a website link.");
            message.author.send("-!info version - sends you bot version.");
            message.author.send("-!grammerly - sends you grammerly accounts list.");
           // message.author.send("-!user - shows user information.");
            message.author.send("          Mod Commands        ");
            message.author.send("-!clear - clears messages");
            message.author.send("-!kick - kicks a user from the server.");
            message.author.send("-!ban - bans the user from the server.");
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
            if(!message.member.roles.find(r => r.name === "Mod")){
                message.reply("You don't have access to this command!")
            }
            else
            {
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
        }
            break;

            case 'ban':
                if(!message.member.roles.find(r => r.name === "Mod")){
                    message.reply("You don't have access to this command!")
                }
                else
                {
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
            if(!message.member.roles.find(r => r.name === "Mod")){
                message.reply("You don't have access to this command!")
            }
            else
            {
            if (!args[1]) return message.reply('Enter an amount of messages to delete') //Specific Channel
            message.channel.bulkDelete(args[1]);
            }
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
        case 'sohaibmark':
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
              }
              message.channel.sendMessage('Sohaib has a ' + (getRandomInt(51) + '%' ));
              break;
        case 'darimmark':
            function getRandomInt(max) {
                return Math.floor(Math.random() * Math.floor(max));
              }
              message.channel.sendMessage('<@433653676679102474> has a -' + (getRandomInt(99999) + '%' ));
              break; 
        case 'coronavirus':
           function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
          var number = getRandomInt(101);
          message.reply('has a ' +number + '% chance of getting Corona Virus!' )
          if(number >= 90){
              message.reply("is going to cough!!! Everyone get a way from him!")
              break;
          }
          if(number == 0){
              message.reply('is safe from the Corono!');
              break;
          }
          break;
        case 'mymark':
            function getRandomInt(max) {
             return Math.floor(Math.random() * Math.floor(max));
           }
           var number = getRandomInt(101);
           message.reply('has a ' +number + '% mark!' )
           if(number == 100){
            message.channel.sendMessage("They have a hundred! Congratulations you now have 1% of Marko's IQ! <:marko:756981106619711549>")
            break;
        }
        else if(number >= 95){
            message.channel.sendMessage("You got a Pranav mark! <:pranav:756980746195042365> But CHOKED so you didn't get a 100!")
            break;
        }
          else if(number >= 90){
               message.channel.sendMessage("They only have a " + number + "% Why no 100? <:darim:756982325086257192>")
               break;
           }
           else if(number >= 80 && number < 90){
            message.channel.sendMessage("They only have a " + number + "% Get better kid... <:manuga:756981155126968463>")
            break;
        }
        else if(number >= 70 && number < 90){
            message.channel.sendMessage("They only have a " + number + "% That is a bruh moment...")
            break;
        }
        else if(number >= 50 && number < 70){
            message.channel.sendMessage("They only have a " + number + "% Who cares about marks anyways? School is temporary, gaming is forever.")
            break;
        }
        else if(number >= 21 && number < 50){
            message.channel.sendMessage("They only have a " + number + "% They didn't pass :(")
            break;
        }
           
          else if(number <= 20){
               message.channel.sendMessage('Thats almost as bad as a sohaibmark! <:sohaib:756981451777376346>');
               break;
           }
           else if(number == 0){
            message.channel.sendMessage("You got a sohaib mark! <:sohaib:756980664783470714>")
            break;
        }
           break;
        case 'b':
            message.delete();
            let argsresult = args.slice(1).join(" ");
            if(!message.member.roles.find(r => r.name === "Mod")){
                message.reply("You don't have access to this command!");
            }
            else
            {
                if (!args[1]) return message.reply('Enter the announcement') //Specific Channel
                message.channel.sendMessage(" **"+ argsresult + "**"); 
                break;
            }
        case 'markomark':
            function getRandomDouble(max) {
                return Math.floor(Math.random() * Math.floor(max));
              }
              var number = getRandomDouble(1000000000);
        message.channel.sendMessage('Better than Pwanav by ' + number + '%.' );
        message.channel.sendMessage('<:marko:688768510075207683>');
        break;
        case 'sohaib':
            message.channel.sendMessage('sohaib');
            message.channel.sendMessage('haha'); 
            message.channel.sendMessage('funny guy'); 
            message.channel.sendMessage(':thumbsup:'); 
            break;
            }
});

bot.login(process.env.token);
