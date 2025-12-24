import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserTypeService } from "./userType.service";
import { CommonService } from "src/common/services/common.service";

@Controller('user-type')
export class userTypeController extends CommonService {
    constructor(private userTypeService: UserTypeService) {
        super();
    }

    @Get(':userId')
    async getUserType(
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        const userType = await this.userTypeService.resolveUserType(userId);

        if(!userType) {
            return {
                message: 'No matching user type found',
            };
        }

        return {
      id: userType.id.toString(),
      name: userType.name,
      description: userType.description,
      minXP: userType.min_xp?.toNumber?.(),
      maxXP: userType.max_xp?.toNumber?.(),
      minQuizzes: userType.min_quizzes?.toNumber?.(),
    };
    } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      message: 'Internal server error',
      error: err.message,
    };

}

@Get(':userId/debug')
async debugUserType(
    @Param('userId', ParseIntPipe) userId: number,
) {
    const user = await this.prisma.user.findUnique({
        where: { userId },
        select: {
            userId: true,
            username: true,
            currentXP: true,
            completedQuests: true,
            coderTypeId: true,
            coderType: true,
        },
    });

    if(!user) {
        return {
            error: 'User not found',
        };
    }

    const resolvedType = await this.userTypeService.resolveUserType(userId);

    return {
        user,
        resolvedType,
    };

}

}