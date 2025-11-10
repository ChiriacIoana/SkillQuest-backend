import { IsNotEmpty, IsString, Length, Matches, Validate } from "class-validator";
import { IsPasswordStrong } from "src/common/constraints/password.constraint";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @Length(6, 100)
    @Validate(IsPasswordStrong)
    password: string;
}