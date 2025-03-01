# Discord Translation Bot

A Discord bot that automatically detects and translates non-English messages into English. The bot uses Claude AI to detect the language and provide accurate translations, including slang and abbreviations.

## Features

- Automatic language detection
- Real-time translation to English
- Preserves original meaning, including slang and abbreviations
- Clean embed display with original language information
- Ignores bot messages and commands

## Requirements

- Node.js or Bun runtime
- Discord bot token
- Anthropic API key

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
# or
bun install
```

3. Create a `.env` file based on the example:

```
DISCORD_TOKEN=your-discord-token
ANTHROPIC_API_KEY=your-anthropic-api-key
```

## Usage

Start the bot:

```bash
npm start
# or
bun start
```

For development with hot reloading:

```bash
npm run dev
# or
bun run dev
```

## Docker Deployment

Build and run with Docker Compose:

Add the api keys to the docker compose at `compose.yml`
```yml
  - ANTHROPIC_API_KEY=sk-
  - DISCORD_TOKEN=discord-token
```

```bash
docker compose up -d
```

## How It Works

1. The bot listens to all messages in channels it has access to
2. When a non-English message is detected, it's sent to Claude AI for translation
3. The translation is posted as a reply to the original message in an embed
4. Messages in English or starting with `/` are ignored

## Configuration

The bot uses the following environment variables:

- `DISCORD_TOKEN`: Your Discord bot token
- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude AI

## License

ISC

## Author

Bram Suurd