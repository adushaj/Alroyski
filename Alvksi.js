const Discord = require('discord.js'),
      client = new Discord.Client();
const chalk = require('chalk');
const config = require("./config.json");

client.on('ready', () => {
    client.user.setPresence({ status: 'online', game: { name: 'Enter .help to get started' } });
    const guilds = client.guilds.map(guild => {
        return {
            name: guild.name,
            channels: guild.channels.map(channel => {
                if (channel.type == "category") return chalk.red(">> Category: ") + chalk.gray(channel.name);
                if (channel.type == "voice") return chalk.white(">> Voice: ") + chalk.gray(channel.name);
                if (channel.type == "text") return chalk.white(">> Text: ") + chalk.gray(`#${channel.name}`);
            })
        };
    });

    guilds.forEach(info => {
        console.log(chalk.blue.bgRed.bold(">>>>>>>>>>>>>>>>>> Guild ") + chalk.gray(info.name));
        console.log(info.channels.join("\n"));
        console.log(chalk.gray('----------------'));
    });

    const channel = client.channels.get("579000281917030409"); //channel in dev server
    channel.send("My master just booted me back online. I'm ready for your command!");

    notice(`Booted online as ${client.user.username}#${client.user.discriminator}`);
});

//joined a server
client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
})

//removed from a server
client.on("guildDelete", guild => {
    console.log("Left a guild: " + guild.name);
})

client.on('error', console.error);
client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(".")) return command(message);
});

function command(message) {
    const channel = message.channel,
          user = message.author,
          member = message.member;

    const split = message.cleanContent.split(" "),
          command = split[0].substr(1),
          args = split.slice(1);

    if (command == "join") return join(member, channel);
    if (command == "help") return help(args, message);
    if (command == "draft") return draft(args, message);
    if (command == "gather") return gather(args, message);
    if (command == "montage") return montage(args, message);
    if (command == "specs") return specs(args, message);
    if (command == "embed") return embed(args, message);
    if (command == "nut") return nut(args, message);

    channel.send(user + " Sorry, I don't understand that command.\nNeed help with my functions? Use `.help` or message `Alvks#1337`.").then(msg => msg.delete(10 * 1000));
};

function nut(args, message) {
  const embed = new Discord.RichEmbed();
  embed.setImage('https://i.imgur.com/gVnh8WQ.jpg');
  message.channel.send(embed);
};
// this is here for my own reference
function embed(args, message) {
const exampleEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addField('Regular field title', 'Some value here')
	.addBlankField()
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

	message.channel.send(exampleEmbed);
};

function specs(args, message) {
  if (args.length > 0) return message.channel.send(`Looks like you need help with ${args}. Visit the repository at https://github.com/adushaj/Alvksi to learn how to use this bot.`);
	const embed = new Discord.RichEmbed();
	embed.setTitle(`Alvks' PC Specs`);
	embed.setColor('#f4b342');
	embed.setDescription(`CPU: Intel i7-7700K\nGPU: EVGA GeForce GTX 1080 Ti FTW3\nMonitor: Acer Predator XB252\nMouse: Glorious Model O`);
	embed.addField('DPI/Sens', '400 DPI / 15 in-game / 1.0 ADS', true);
  embed.setThumbnail('https://i.imgur.com/4cThS0m.jpg');
	message.channel.send(embed);
};
function montage(args, message) {
	if (args.length < 0) return message.channel.send(`Looks like you need help with ${args}. Visit the repository at https://github.com/adushaj/Alvksi to learn how to use this bot.`);
	if (args == "destiny") {
  	const embed = new Discord.RichEmbed();
  	embed.setColor('#f4b342');
  	embed.setTitle(`Alvks' Destiny Montages`);
  	embed.setDescription('I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Destiny gameplay, visit the YouTube playlist below. \n\nhttps://youtu.be/CGf_q2zCJV4');
  	embed.setThumbnail('https://i.imgur.com/4cThS0m.jpg');
  	message.channel.send(embed);
	}
		if (args == "overwatch") {
	const embed = new Discord.RichEmbed();
	embed.setColor('#f4b342');
	embed.setTitle(`Alvks' Overwatch Montages`);
	embed.setDescription('I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Overwatch gameplay, visit the YouTube playlist below. \n\nhttps://youtu.be/0LEvm4NOnv8');
	embed.setThumbnail('https://i.imgur.com/4cThS0m.jpg');
	message.channel.send(embed);
	}
		if (args == "rocketleague") {
	const embed = new Discord.RichEmbed();
	embed.setColor('#f4b342');
	embed.setTitle(`Alvks' Rocket League Montages`);
	embed.setDescription('I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Rocket League gameplay, visit the YouTube playlist below. \n\nhttps://youtu.be/LcPaAMSeBfg');
	embed.setThumbnail('https://i.imgur.com/4cThS0m.jpg');
	message.channel.send(embed);
	}
};

function help(args, message) {
    if (args.length > 0) return message.channel.send(`Looks like you need help with ${args}`);
    const embed = new Discord.RichEmbed();
    embed.setColor('#f4b342');
    embed.setTitle(`Alvksi`);
    embed.setDescription("This bot's function is to randomly draft teams of 3 from a voice channel, output those rosters to the chat, then move the players to a team voice channel.\nRequirements are to have a voice channel named `Pregame` and 2+ team voice channels, like `team 1`, `team 2`, etc. \nEnter `.draft` to roll teams and `.gather` to re-draft. \nFound a bug? Message `Alvks#1337` in Discord.\nWant to contribute or view more commands? Visit the repository at https://github.com/adushaj/Alvksi");
    embed.setThumbnail('https://i.imgur.com/4cThS0m.jpg');
    message.channel.send(embed);
};
// draft teams
function draft(args, message) {
  //  if (args.length > 0) return message.channel.send("You're not using this command right. You cannot have teams greater than 6 members each nor less than 1.\nAlso ensure that the members are in the pregame voice channel before typing the command.");
  const value = parseInt(args[0]);
  if (isNaN(value) || value < 1 || value > 6) return message.channel.send("Provide a value between 1 and 6. This will be the size of each team. Example: Entering `.draft 2` will create teams of 2 players.");

    const vc = message.guild.channels.find(x => x.name.toLowerCase().includes("pregame"));
    const members = shuffle(Array.from(vc.members));
    const teams = chunkify(members, value);
	  message.channel.send("Teams are set. To re-draft teams, enter `.gather` to return players to the Pregame channel.");
    teams.forEach((members, i) => {
        const channels = Array.from(message.guild.channels.filter(x => x.name.toLowerCase().includes("team") && x.type == "voice"));

        const embed = new Discord.RichEmbed();
        embed.setTitle(`Team ${i + 1}`);
        embed.setColor('#f4b342');
        embed.setDescription(members.map(x => `> ${x[1]}`));

        message.channel.send(embed);

        members.forEach(member => {
            member[1].setVoiceChannel(channels[i][1]);
        });
    });
};

function gather(args, message) {
    const channels = message.guild.channels.filter(x => x.name.toLowerCase().includes("team"));
	const vc = message.guild.channels.find(x => x.name.toLowerCase().includes("pregame"));
    channels.forEach(channel => {
        if (channel.type != "voice") return;
        channel.members.forEach(member => member.setVoiceChannel(vc));
    });
	message.channel.send("Players were successfully returned to the Pregame channel.");
};

function join(member, channel) {
    member.voiceChannel.join().then(() => {
        channel.send("Hello friends.");
    });
};

function shuffle(array) {
    // Fischer-Yates Randomization Algorithm
    let copy = [], n = array.length, i;
    while (n) {
        i = Math.floor(Math.random() * n--);
        copy.push(array.splice(i, 1)[0]);
    };
    return copy;
};

function chunkify(myArray, chunk_size){
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    };
    return tempArray;
};

function notice(message) {
    console.log(chalk.red("[NOTICE]: ") + chalk.gray(message));
};

client.login(config.token);
