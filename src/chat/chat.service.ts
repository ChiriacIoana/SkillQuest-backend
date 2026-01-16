import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import fetch from 'node-fetch';


interface HackAIResponse {
id: string;
output?: Array<{
    content?: Array<{
      text?: string;
    }>;
  }>;
}

@Injectable()
export class ChatService {
	async sendMessage(message: string, conversationId?: string) {
		try {
			const res = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.AI_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: 'openai/gpt-5.1',
					input: [
						{
							type: 'message',
							role: 'user',
							content: [{ type: 'input_text', text: message }]
						}
					],
					conversation_id: conversationId
				})
			});

			if (!res.ok) throw new Error(`AI API error: ${res.status}`);

			const data = (await res.json()) as HackAIResponse;
			const text = data.output?.[0]?.content?.[0]?.text ?? 'Unable to generate response at this time.';
			return { text, conversationId: data.id };
		} catch (err) {
			console.error(err);
			throw new HttpException(
				'Failed to get AI response',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
