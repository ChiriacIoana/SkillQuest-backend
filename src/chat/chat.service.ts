import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import fetch from 'node-fetch';
import configuration from '../../env.config';

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
	private extractAIText(data: any): string {
  if (!data?.output) return 'Unable to generate response at this time.';

  const texts: string[] = [];

  for (const msg of data.output) {
    if (!msg.content) continue;

    for (const c of msg.content) {
      if (c.type === 'output_text' && c.text) {
        texts.push(c.text.trim());
      }
    }
  }

  return texts.join('\n') || 'Unable to generate response at this time.';
}

	async sendMessage(message: string, conversationId?: string) {
		try {
			const res = await fetch('https://ai.hackclub.com/proxy/v1/responses', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${configuration.HACKAI_API_KEY}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					model: 'openai/gpt-4o-mini',
					input: [
						{
							type: 'message',
							role: 'user',
							content: [
								{
									type: 'input_text',
									text: `
You are a helpful AI tutor chatting with a student.

IMPORTANT RULES:
- FINISH THE SENTENCES THAT YOU ARE STARTING. Do NOT leave sentences hanging.
- Respond directly to the user.
- Do NOT explain your reasoning.
- Do NOT narrate your thoughts.
- Do NOT describe what you are thinking.
- Give a clear, friendly, and complete answer.
- Give concise answers.
- Give your answer in 2-3 sentences MAXIMUM.

User question:
${message}
`
								}
							]
						}
					],
					conversation_id: conversationId,
					max_output_tokens: 350
				})
			});

			if (!res.ok) throw new Error(`AI API error: ${res.status}`);

			const data = (await res.json()) as HackAIResponse;

			const text = this.extractAIText(data);

			return {
				text,
				conversationId: data.id
			};
		} catch (err) {
			console.error(err);
			throw new HttpException(
				'Failed to get AI response',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
