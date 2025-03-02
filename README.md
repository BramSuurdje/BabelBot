# Discord Translation Bot 🌐

Discord Translation Bot is a powerful, user-friendly bot that automatically detects and translates non-English messages into English. Built with AI language detection technology, it preserves the original meaning of messages including slang and abbreviations while providing seamless translations in real-time.

## Features ✨

- **Automatic Language Detection**: Instantly identifies the source language
- **Real-time Translation**: Converts non-English messages to English seamlessly
- **Slang & Abbreviation Support**: Preserves original meaning and context
- **Clean Display Format**: Shows translations in embedded messages with source language information
- **Smart Filtering**: Ignores bot messages and command prefixes
- **Multi-Provider Support**: Compatible with various LLM providers through Vercel AI SDK

## LLM Provider Options 🧠

- **Anthropic (Claude)**: Advanced understanding of context and nuance
- **OpenAI**: GPT models for accurate translations
- **Google AI (Gemini)**: Powerful multilingual capabilities
- **Mistral AI**: Efficient language processing
- **Additional Options**: Cohere, Llama, Hugging Face, and more

Switch providers by updating your `.env` file and model configuration. See the [AI SDK Providers documentation](https://sdk.vercel.ai/providers/ai-sdk-providers) for all supported options.

## Tech Stack 💻

- **Runtime**: [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/)
- **Framework**: [Discord.js](https://discord.js.org/)
- **AI Integration**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Containerization**: [Docker](https://www.docker.com/)

## Prerequisites 📋

- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/) runtime
- Discord bot token
- API key for your chosen LLM provider

## Getting Started 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/discord-translation-bot.git
   cd discord-translation-bot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Create a `.env` file with your API keys:
   ```bash
   DISCORD_TOKEN=your-discord-token
   ANTHROPIC_API_KEY=your-anthropic-api-key
   # or other provider keys as needed
   ```

4. Start the bot:
   ```bash
   npm start
   # or
   bun start
   ```

The bot will connect to Discord and begin translating messages automatically.

## Environment Variables 🔧

| Variable | Description | Example |
|----------|-------------|---------|
| `DISCORD_TOKEN` | Your Discord bot token | abc123... |
| `ANTHROPIC_API_KEY` | Anthropic API key (for Claude) | sk-ant-... |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI API key (for Gemini) | AIza... |
| *Other provider keys* | API keys for other LLM providers | *varies* |

## Development Commands 🛠️

- `npm start` or `bun start` - Start the bot
- `npm run dev` or `bun run dev` - Start with hot reloading for development

## Docker Deployment 🐳

1. Configure your API keys in `compose.yml`:
   ```yml
   - ANTHROPIC_API_KEY=sk-ant-...
   - DISCORD_TOKEN=your-discord-token
   ```

2. Build and run with Docker Compose:
   ```bash
   docker compose up -d
   ```

## How It Works 📝

1. Bot listens to all messages in channels it has access to
2. When a non-English message is detected, it's sent to the configured LLM for translation
3. Translation is posted as a reply to the original message in an embed
4. Messages in English or starting with `/` are ignored

## License 📄

This project is licensed under the ISC License.

## Author ✍️

Bram Suurd

---

Made with ❤️ by Bram Suurd