import { Injectable } from '@nestjs/common';
import { CommonService } from 'src/common/services/common.service';

@Injectable()
export class UserTypeService extends CommonService {
    constructor() {
        super();
    }

    async resolveUserType(userId: number) {
        //get user stats

        const user = await this.prisma.user.findUnique({
            where: { userId },
            select: {
                currentXP: true,
                completedQuests: true,
                coderTypeId: true,
            },
        });

        if(!user) 
            throw new Error('User not found');

        //find the suitable type of coder
        const matchingType = await this.prisma.userType.findFirst({
            where: {
                AND: [
                    {
                        OR: [
                            {min_xp: null},
                            {min_xp: {lte: user.currentXP}},
                        ],
                    },
                    {
                        OR: [
                            {max_xp: null},
                            {max_xp: {gte: user.currentXP}},
                        ],  
                    },
                    {
                        OR: [
                            {min_quizzes: null},
                            {min_quizzes: {lte: user.completedQuests}},
                        ],

                    },
                ],
            },
            orderBy: {
                min_xp: 'desc',
            },
        });
    
        if(!matchingType)
            return null;

        //update if changed
        if(user.coderTypeId !== matchingType.id) {
            await this.prisma.user.update({
                where: { userId },
                data: { coderTypeId: matchingType.id },
            });
        }
        return matchingType;
    }
    
   
}
