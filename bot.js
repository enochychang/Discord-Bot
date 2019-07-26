const Discord = require('discord.js');
const client = new Discord.Client();
const weather = require('weather-js')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.guilds.forEach((guild) => {
    console.log(guild.name)

    guild.channels.forEach((channel) => {
      console.log(` - ${channel.name} (${channel.type}) - ${channel.id}`)
    });
  });

  let generalChannel = client.channels.get("539720361152086021")
  const attachment = new Discord.Attachment("https://media.giphy.com/media/Txun6ahh9auWs/giphy.gif")
  generalChannel.send("Nom nom nom")
  generalChannel.send(attachment)

  client.user.setPresence({
    game:{
      name:'Grass Eating Simulator'
    },
    status:'online'
  });


});

client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) {
    return
  }

  if (receivedMessage.content.startsWith("!")) {
    proccessCommand(receivedMessage)

  }

});

function proccessCommand(receivedMessage) {
  let fullCommand = receivedMessage.content.substr(1)
  let splitCommand = fullCommand.split(" ")
  let primaryCommand = splitCommand[0]
  let arguments = splitCommand.splice(1)

  if (primaryCommand == "help") {
    helpCommand(arguments, receivedMessage)
  }
  else if (primaryCommand == "henlo") {
    receivedMessage.channel.send("Henlo " + receivedMessage.author.toString() + " :3")
    receivedMessage.react("🐑");
  }
  else if (primaryCommand == "weather") {

    weatherCommand(arguments, receivedMessage);
  }
  else {
    receivedMessage.channel.send("Unknown command. Try `!help`.")
  }

}

function helpCommand(arguments, receivedMessage) {
  if (arguments.length == 0) {
    receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`" + ".")
  }
  else {
    receivedMessage.channel.send("It looks like you need help with " + arguments + ".")
  }
}

function weatherCommand(arguments, receivedMessage) {

  weather.find({search: arguments.join(" "), degreeType: 'F'}, function(err, result) {
    if (err) receivedMessage.channel.send(err);

    var current = result[0].current;
    var location = result[0].location;

    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86)
      .addField('Timezone', `UTC${location.timezone}`, true)
      .addField('Degree Type', location.degreetype, true)
      .addField('Temperature', `${current.temperature} Degrees`, true)
      .addField('Feels Like', `${current.feelslike} Degrees`, true)
      .addField('Winds', current.winddisplay, true)
      .addField('Humidity', `${current.humidity}%`, true)

      receivedMessage.channel.send({embed});
  });
}



client.login("****");
