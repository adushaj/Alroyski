# Alroyski

## As of May 2021, this bot is no longer supported nor am I hosting it. I made this decision after becoming increasingly frustrated with malicious attempts being made to shut it down. The fight to prevent that no longer became worth it so thank you for your understanding!

> A DiscordJS Bot for random team scrimmages

## About

Gather all of your clan members into a voice channel, execute a command to Alroyski, and watch as the players are randomly drafted into two teams of 2-6 players and moved to their team voice channels. Then, you are ready to play.

## Setup/Requirements
1. Voice channels properly named
  - Create a voice channel named "Pregame"
  - Create 2 voice channels with "Team" included somewhere in the name. Names like "Team 1" or "Alpha Team" will work.
2. Add the bot to your server by clicking [this link](https://discordapp.com/oauth2/authorize?&client_id=578704612782112778&scope=bot&permissions=18082832).
3. Once the bot is added to your server, you can interact with it using the commands listed below.

## Usage

Commands for this bot follow this structure: `.<command> [argument]`.

| Command | Description
|---------|-------------|
| `.help` | Shows commands and developer contact info. |
| `.draft 2-6` | Randomly assigns players in Pregame channel into teams. You cannot execute this command unless there are an even number of members in the voice channel. For example, entering `.draft 2` when there are 5 members in the channel will fail. |
| `.montage [argument]` | Shares a YouTube playlist of my gameplay montages, depending on which game is given as an argument. For example, entering `.montage destiny` will return a link to my Destiny montages. |
