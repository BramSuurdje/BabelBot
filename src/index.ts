import { Client, GatewayIntentBits, Message, EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
import { anthropic } from '@ai-sdk/anthropic';
import { generateObject, generateText } from 'ai';
import { infer, object, z } from 'zod';
import { tryCatch } from 'try-catch-wrapper-ts';

dotenv.config();

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TranslationResponseSchema = z.object({
  translatedText: z.string().describe("the translated text into english"),
  detectedLanguage: z.string().describe("the detected language, e.g English, Spanish, Dutch, French, etc")
})

type TranslationResponse = z.infer<typeof TranslationResponseSchema>;

// Function to detect language and translate
async function translateMessage(content: string): Promise<TranslationResponse> {
  const { data, error } = await tryCatch(generateObject({
    model: anthropic("claude-3-5-haiku-latest"),
    schema: TranslationResponseSchema,
    messages: [
      {
        role: "system",
        content: "Translate the following text into English. Detect the source language automatically. Recognize and properly translate slang terms and abbreviations while maintaining the original meaning."
      },
      {
        role: "user",
        content: `${content}`
      }
    ]
  }));

  if (error) {
    return {
      translatedText: error.message,
      detectedLanguage: "Error"
    };
  }

  return data.object
}

// Handle incoming messages
client.on('messageCreate', async (message: Message) => {
  // Ignore bot messages and empty messages
  if (message.author.bot || !message.content.trim()) return;
  
  // Don't translate messages that are commands
  if (message.content.startsWith('/')) return;

  try {
    // Get translation
    const data = await translateMessage(
      message.content
    );

    // Skip if already English
    if (data.detectedLanguage === "English") return;

    // Create embed with translation
    const translationEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({
        name: message.author.username,
        iconURL: message.author.displayAvatarURL(),
      })
      .setDescription(data.translatedText)
      .setFooter({
        text: `Original language: ${data.detectedLanguage}`,
      })
      .setTimestamp();

    // Send the translation
    await message.reply({ embeds: [translationEmbed] });
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// Login to Discord
client.login(process.env.DISCORD_TOKEN);

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});
