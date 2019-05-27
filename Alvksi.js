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
                if (channel.type == "voice") return chalk.blue(">> Voice: ") + chalk.gray(channel.name);
                if (channel.type == "text") return chalk.blue(">> Text: ") + chalk.gray(`#${channel.name}`);
            })
        };
    });

    guilds.forEach(info => {
        console.log(chalk.cyan(">>> Guild ") + chalk.gray(info.name));
        console.log(info.channels.join("\n"));
        console.log(chalk.gray('----------------'));
    });

    const channel = client.channels.get("579000281917030409");
    channel.send("My master just booted me back online. I'm ready for your command!");
    
    notice(`Booted online as ${client.user.username}#${client.user.discriminator}`);
});

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
    if (command == "multiply") return multiply(args, message);
    if (command == "draft") return draft(args, message);
    if (command == "gather") return gather(args, message);
	if (command == "montage") return montage(args, message);
    if (command == "specs") return specs(args, message);
    
    channel.send(user + " Sorry, I don't understand that command.\nNeed help with my functions? Use `.help` or message `Alvks#7673`.").then(msg => msg.delete(10 * 1000));
};
function specs(args, message) {
    if (args.length > 0) return message.channel.send(`Looks like you need help with ${args}`);
	const embed = new Discord.RichEmbed();
	embed.setTitle(`Alvks' current PC specs`);
	//embed.setAuthor(client.user.username, client.user.avatarURL);
	embed.setColor('#36393F');
	embed.setDescription(`CPU: Intel i7-7700K\nGPU: EVGA GeForce GTX 1080 Ti FTW3\nMouse: Glorious Model O`);
	message.channel.send(embed);
};
function montage(args, message) {
	if (args.length < 0) return message.channel.send(`Looks like you need help with ${args}. Visit the repository at https://github.com/adushaj/Alvksi to learn how to use this bot.`);
	if (args == "destiny") return message.channel.send(`I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Destiny gameplay, visit the YouTube playlist below. \n\nhttps://www.youtube.com/watch?v=LlJRbY-YmSQ&list=PL57SfHRFPJkDh88P2Q6Zeo1mi2hLsoCsC`);
    if (args == "overwatch") return message.channel.send(`I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Overwatch gameplay, visit the YouTube playlist below. \n\nhttps://www.youtube.com/watch?v=0LEvm4NOnv8&list=PL57SfHRFPJkChM_u-RATnF8CQSWj2Sw0T`);
	if (args == "rocketleague") return message.channel.send(`I record gameplay with Shadowplay and cut it all in Sony Vegas. \nIf you would like to see my Rocket League gameplay, visit the YouTube playlist below. \n\nhttps://www.youtube.com/watch?v=LcPaAMSeBfg&list=PL57SfHRFPJkARqtd_ugsHiqTEd_ytLBqP`);
};

function help(args, message) {
    if (args.length > 0) return message.channel.send(`Looks like you need help with ${args}`);
    message.channel.send("This bot's function is to randomly draft teams of 3 from a voice channel, output those rosters to the chat, then move the players to a team voice channel.\nRequirements are to have a voice channel named `Pregame` and 2+ team voice channels, like `team 1`, `team 2`, etc. \nEnter `.draft` to roll teams and `.gather` to re-draft. \nFound a bug? Message `Alvks#1337` in Discord.\nWant to contribute or view more commands? Visit the repository at https://github.com/adushaj/Alvksi");
};
// this function is here strictly for event handling tests
function multiply(args, message) {
    if (args.length < 2) return message.channel.send("There aren't enough values to multiply! Try `.multiply 2 4 10`");
    const product = args.reduce((a, b) => a * b);
    message.channel.send(`The product of ${args.join(", ")} is ${product.toLocaleString()}`);
};

function draft(args, message) {
    if (args.length > 0) return message.channel.send("You're not using this command right, don't use any arguments with it.\nAlso ensure that the members are in the pregame voice channel before typing the command.");
	const vc = message.guild.channels.find(x => x.name.toLowerCase().includes("pregame"));
    const members = Array.from(vc.members);
    const teams = chunkify(members, 3);
	message.channel.send("Teams are set. To re-draft teams, enter `.gather` to return players to the Pregame channel.");
    teams.forEach((members, i) => {
        const channels = Array.from(message.guild.channels.filter(x => x.name.toLowerCase().includes("team") && x.type == "voice"));

        const embed = new Discord.RichEmbed();
        embed.setTitle(`Team ${i + 1}`);
        embed.setAuthor(client.user.username, client.user.avatarURL);
        embed.setColor('#36393F');
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
<<<<<<< HEAD

client.login(config.token);
=======
bot_secret_token"
client.login(bot_secret_token)
>>>>>>> b85f15d494f61ec2f6f2e867bb43d1fc019c57bd
