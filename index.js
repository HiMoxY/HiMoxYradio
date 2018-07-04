const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require('ytdl-core'); 
client.on('ready', () => {
  console.log('i'm online mate!');
});

client.on('message', message => {
      const voiceChannel = message.member.voiceChannel;
      var isReady = true;

      if (message.content === '!!join') {
        if(!voiceChannel) {
          const embedError = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik kan je spraakkanaal niet vinden!`)
          .setColor(`#ff0000`)
          .setFooter(`Zorg dat je in een spraakkanaal zit`);

          message.channel.send(embedError)
        } else if (isReady === true) {
          voiceChannel.join().then(connection => {
            const dispatcher = connection.playStream('http://18973.live.streamtheworld.com/RADIO538.mp3');

            isReady = false;

            const embed = new Discord.RichEmbed()
            .setTitle(`ik speel muziek af`)
            .setDescription(`Je luistert nu naar Radio 538!`)
            .setColor(`#00ff00`)
            .setFooter(`Yay :D`);

            message.channel.send({embed});

            dispatcher.on("end", end => {
              voiceChannel.leave();
              message.channel.send(`Tijd is op!`);
              isReady = true;
            });
          });
        } else {
          const embedError2 = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik speel al muziek af!`)
          .setColor(`#ff0000`)
          .setFooter(`Yay :D`);

          message.channel.send(embedError2);
        }
      } 
   if (message.content === "!!leave") {
        if(!voiceChannel) {
          const embedError3 = new Discord.RichEmbed()
          .setTitle(`Foutmelding!`)
          .setDescription(`Ik kan je spraakkanaal niet vinden!`)
          .setColor(`#ff0000`)
          .setFooter(`Yay :D`);

          message.channel.send(embedError3);
        } else {
          voiceChannel.leave();
          message.channel.send(`Succesvol losgekoppeld!`);
        }
      }
   if(message.content.startsWith("!!play")) {
          message.reply('laat het feest maar beginnen!! :)');
    var str = message.content;
    var link = str.substr(8);
    const streamOptions = { seek: 0, volume: 1 };
    message.member.voiceChannel.join()    .then(connection => {
        const stream = ytdl(link, { filter : 'audioonly' });
        const dispatcher = connection.playStream(stream, streamOptions);
      })
      .catch(console.error);
    }
});
client.login(process.env.TOKEN);
