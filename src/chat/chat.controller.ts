import {Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import {ChatService} from './chat.service';

interface ChatRequestDto {
    message: string;
    conversationId?: string;
}

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post() 
    async sendMessage(@Body() body: ChatRequestDto) {
        const { message, conversationId } = body;

        if(!message) {
            throw new HttpException('Message is required', HttpStatus.BAD_REQUEST);
        }

        const response = await this.chatService.sendMessage(message, conversationId);

        return response;
}
}