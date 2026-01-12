import {Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { HintService } from './hint.service';
import { CommonService } from 'src/common/services/common.service';

interface HintrequestDto {
    questionText: string;
    correctAnswer: string;
    userAnswer?: string;
}

@Controller('hint')
export class HintController extends CommonService{
    constructor(private hintService: HintService) {
        super();
    }

    @Post()
    async generateHint(@Body() body: HintrequestDto) {
        const { questionText, correctAnswer, userAnswer } = body;

        if(!questionText || !correctAnswer) {
            throw new HttpException(
                'questionText and correctAnswer are required', 
                HttpStatus.BAD_REQUEST
            );
        }

        const hint = await this.hintService.generateHint(
            questionText,
            correctAnswer,
            userAnswer
        );

        return { hint };
    }
}