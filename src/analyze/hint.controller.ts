import {Controller, Post, Body, HttpException, HttpStatus} from '@nestjs/common';
import { HintService } from './hint.service';
import { CommonService } from 'src/common/services/common.service';

interface HintrequestDto {
    questionText: string;
}

@Controller('hint')
export class HintController{
    constructor(private hintService: HintService) {
    }

    @Post()
    async generateHint(@Body() body: HintrequestDto) {

        const { questionText} = body;

        if(!questionText) {
            throw new HttpException(
                'questionText is required', 
                HttpStatus.BAD_REQUEST
            );
        }

        const hint = await this.hintService.generateHint(questionText);

        return { hint };
    }
}