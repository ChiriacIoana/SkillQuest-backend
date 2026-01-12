import {Module} from '@nestjs/common';
import { HintService } from './hint.service';
import { HintController } from './hint.controller';

@Module({
    controllers: [HintController], 
    providers: [HintService],
    exports: [HintService],
})


export class HintModule {}