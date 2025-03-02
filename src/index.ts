/**
 * Discord Translation Bot
 *
 * This bot automatically detects non-English messages in a Discord server
 * and translates them to English using Google's Gemini AI model.
 *
 * Required environment variables:
 * - DISCORD_TOKEN: Your Discord bot token
 */

import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { Client, EmbedBuilder, GatewayIntentBits, Message } from 'discord.js';
import dotenv from 'dotenv';
import { tryCatch } from 'try-catch-wrapper-ts';
import { z } from 'zod';

dotenv.config();

// Initialize Discord client with required permissions
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, // Needed to interact with guild data
		GatewayIntentBits.GuildMessages, // Needed to read messages
		GatewayIntentBits.MessageContent, // Needed to read message content
	],
});

// Schema for validating and typing translation responses
const TranslationResponseSchema = z.object({
	translatedText: z.string().describe('the translated text into english'),
	detectedLanguage: z
		.string()
		.describe('the detected language, French, English, Spanish etc etc '),
});

type TranslationResponse = z.infer<typeof TranslationResponseSchema>;

// System prompt that guides the AI's translation behavior
const prompt = `
You are a translation bot for a Discord server. Your task is to translate messages from other languages to English while maintaining the original meaning, tone, and intent.

## Translation requirements:

- Translate French text to natural, conversational English
- Keep the same tone (formal, casual, humorous) as the original
- Preserve emojis, formatting, and sentence structure when possible
- Handle French slang, idioms, and cultural references appropriately

## Special considerations:

- Properly translate gaming terms and internet slang common in Discord
- Flag ambiguous phrases that might have multiple meanings
- Keep proper names, brand names, and technical terms unchanged unless translation is necessary
- Include brief explanations in [brackets] for cultural references that might not translate directly
`;

/**
 * Translates a message from any detected language to English
 *
 * @param content - The message text to translate
 * @returns Promise with translation results including detected language and translated text
 */
async function translateMessage(content: string): Promise<TranslationResponse> {
	const { data, error } = await tryCatch(
		generateObject({
			model: google('gemini-2.0-flash-001'),
			schema: TranslationResponseSchema,
			messages: [
				{ role: 'system', content: prompt },
				{ role: 'user', content: `${content}` },
			],
		}),
	);

	// Return error information if translation fails
	if (error) {
		return {
			translatedText: error.message,
			detectedLanguage: 'Error',
		};
	}

	return data.object;
}

// Event handler for new messages
client.on('messageCreate', async (message: Message) => {
	// Ignore bot messages and empty messages
	if (message.author.bot || !message.content.trim()) return;

	// Don't translate messages that are commands
	if (message.content.startsWith('/')) return;

	try {
		// Get translation
		const data = await translateMessage(message.content);
		let footerText = `Original language: ${data.detectedLanguage}`;

		// Skip if already English
		if (data.detectedLanguage === 'English') return;

		// set the footer text to "Error occurred if the detected language is Error"
		if (data.detectedLanguage === 'Error') {
			footerText = 'Error occurred';
		}

		// Create embed with translation
		const translationEmbed = new EmbedBuilder()
			.setColor(0x0099ff)
			.setAuthor({
				name: message.author.username,
				iconURL: message.author.displayAvatarURL(),
			})
			.setDescription(data.translatedText)
			.setFooter({
				text: footerText,
			})
			.setTimestamp();

		// Send the translation as a reply to the original message
		await message.reply({ embeds: [translationEmbed] });
	} catch (error) {
		console.error('Error handling message:', error);
		// No user notification here - fails silently to avoid spamming channel
	}
});

// Connect to Discord API
client.login(process.env.DISCORD_TOKEN);

// Log successful connection
client.once('ready', () => {
	console.log(`Logged in as ${client.user?.tag}`);
});
