# Alvksi
> A DiscordJS Bot for random team scrimmages

## About

There are many web applications that you can find online that will take a list of names from your input and randomly shuffle them into groups of any size you desire. The particular usage for this would be within a video game clan Discord where team scrimmages occur. Gather all of your clan members into a voice channel, execute a command to Alvksi, and watch as the players are randomly drafted into two teams of 1-6 players and moved to their team voice channels. Then you are ready to play.

## Setup/Requirements
1. Voice channels properly named
  - Create a voice channel named "Pregame"
  - Create 2 or more voice channels with "Team" included somewhere in the name. Names like "Team 1" or "Alpha Team" will work.
2. Add the bot to your server by clicking [this link](https://discordapp.com/oauth2/authorize?&client_id=578704612782112778&scope=bot&permissions=18082832).
3. Once the bot is added to your server, you can interact with it using the commands listed below.

## Usage

Commands for this bot follow this structure: `.<command> [argument]`.

| Command | Description
|---------|-------------|
| `.help` | Shows commands and developer contact info. |
| `.draft 1-6` | Randomly assigns players in Pregame channel into teams. You cannot execute this command unless there are an even number of members in the voice channel. For example, entering `.draft 2` when there are 5 members in the channel will fail. |
| `.gather` | Returns drafted players back to Pregame channel. |
| `.montage [argument]` | Shares a YouTube playlist of my gameplay montages, depending on which game is given as an argument. For example, entering `.montage destiny` will return a link to my Destiny montages. |
