<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-audio-playback-bot
</h1>
<h4 align="center">Enhance your Discord experience with seamless music playback.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-Javascript,_Html,_Css-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-MongoDB-green" alt="">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="">
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/spectra-ai-codegen/discord-audio-playback-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/spectra-ai-codegen/discord-audio-playback-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/spectra-ai-codegen/discord-audio-playback-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📜 License
- 👥 Authors

## 📍 Overview
The repository contains a project called "discord-audio-playback-bot" that provides a comprehensive solution to enhance the music experience in Discord servers through seamless playback from various music platforms.

## 📦 Features
|    | Feature                   | Description                                                                                                         |
|----|---------------------------|---------------------------------------------------------------------------------------------------------------------|
| 🎵 | Music Playback        | Integrates multiple music sources like YouTube, Spotify, and SoundCloud for streaming music live in Discord.       |
| ⏱️ | Queue Management      | Users can manage their own song queues, allowing songs to be added, viewed, and controlled in a structured format.  |
| 🔊 | Volume Control        | Provides commands to adjust the volume, including mute and unmute functionalities.                                  |
| ⚙️ | Dynamic Commands      | A set of essential commands for playback control (play, pause, skip, stop) along with a help command.                |
| 🔐 | User Permissions      | Only users with specified roles can manage the bot, ensuring controlled usage to prevent spam.                      |
| 📂 | Playlist Creation     | Users can create custom playlists and share these with others, enhancing community interaction.                     |
| 🔍 | Search Functionality  | Allows users to search for songs directly from the bot, even previewing songs before adding them to the queue.      |
| 🔗 | API Integrations      | Connects with various music service APIs to provide a diverse library of music.                                    |

## 📂 Structure
```
discord-audio-playback-bot/
├── commands/
│   ├── play.js
│   ├── skip.js
│   ├── stop.js
│   ├── queue.js
│   ├── help.js
│   └── search.js
├── events/
│   ├── message.js
│   ├── guildMemberAdd.js
│   ├── ready.js
│   └── voiceStateUpdate.js
├── models/
│   ├── userModel.js
│   ├── playlistModel.js
│   └── songModel.js
├── services/
│   ├── musicService.js
│   ├── queueService.js
│   ├── playlistService.js
│   ├── userService.js
│   └── permissionService.js
├── utils/
│   ├── commandHandler.js
│   ├── logger.js
│   ├── errorHandler.js
│   ├── configLoader.js
│   └── permissionsHandler.js
├── config/
│   ├── env.config.js
│   └── database.config.js
├── routes/
│   ├── api.js
│   └── musicRoutes.js
└── middleware/
    ├── authentication.js
    ├── permissions.js
    └── logging.js
```

## 💻 Installation
### 🔧 Prerequisites
- Node.js
- npm
- MongoDB

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/spectra-ai-codegen/discord-audio-playback-bot.git
   ```
2. Navigate to the project directory:
   ```bash
   cd discord-audio-playback-bot
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## 🏗️ Usage
### 🏃‍♂️ Running the Project
1. Start the bot:
   ```bash
   npm start
   ```
2. Ensure your bot is added to your Discord server and interact using commands defined in `commands/`.

### ⚙️ Configuration
Adjust configuration settings in `.env` to include your Discord bot token and other necessary API keys.

## 🌐 Hosting
### 🚀 Deployment Instructions
You can deploy the bot on services like Heroku, AWS, or DigitalOcean following the standard deployment practices of Node.js applications.

### 🔑 Environment Variables
Add the following to your `.env`:
- `DISCORD_TOKEN`: Your Discord Bot Token
- `MONGODB_URI`: MongoDB connection string

## 📜 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## 👥 Authors
- Drix10 - [GitHub](https://github.com/Drix10)
- Spectra.codes - [Website](https://spectra.codes)

<p align="center">
  <h1 align="center">🌐 Spectra.Codes</h1>
</p>
<p align="center">
  <em>Why only generate Code? When you can generate the whole Repository!</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google_&_Microsoft_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
</p>