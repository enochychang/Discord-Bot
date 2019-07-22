const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.guilds.forEach((guild) => {
    console.log(guild.name)
    guild.channels.forEach((channel) => {
      console.log(' - ${channel.name} ${channel.type} ${channel.id}')
    });
  });

  client.user.setPresence({
    game:{
      name:'Grass Eating Simulator'
    },
    status:'online'
  });


});



client.login("*****");
