import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { env } from 'prisma/config';
import configuration from '../../env.config';

@Injectable()
export class HintService {
  async generateHint(
    questionText: string
  ): Promise<string> {
    try {

      //console.log("HACKAI_API_KEY:", configuration.HACKAI_API_KEY);
      const response = await fetch("https://ai.hackclub.com/proxy/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${configuration.HACKAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-5.1",
          input: [
            {
              type: "message",
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: `
You are a helpful educational tutor providing hints for quiz questions.

Question: ${questionText}

STRICT RULES:
- Do NOT reveal the actual answer directly
- Do NOT give away key terms that are in the correct answer
- DO provide conceptual guidance or approach hints
- DO encourage critical thinking
- Keep hint to 2-3 sentences maximum
- Be supportive and educational
- FINISH a sentence if you start one. Do NOT leave it hanging. PLEASE.

Provide ONLY the hint text, nothing else.
`,
                },
              ],
            },
          ],
          max_output_tokens: 350,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      //console.log('AI API RESPONSE:', data); 

      const hintText = this.extractAIText(data);
      //console.log('EXTRACTED HINT:', hintText); 
      return hintText;
    } catch (err) {
      console.error("Error generating hint:", err);
      throw new HttpException(
        'Error generating hint. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private extractAIText(data: any): string {
    if (!data?.output) return "Unable to generate hint at this time.";
    
    const texts: string[] = [];
    
    for (const msg of data.output) {
      if (!msg.content) continue;
      
      for (const c of msg.content) {
        if (c.type === "output_text" && c.text) {
          texts.push(c.text.trim());
        }
      }
    }
    
    return texts.join("\n") || "Unable to generate hint at this time.";
  }
}