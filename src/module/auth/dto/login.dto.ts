import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { emailRegExp } from 'src/common/types/reg.exp.types';

export class loginDto {
    @ApiProperty({
        description: 'enter the email of the user',
        example: 'john@example.com',
        required: true,
    })
    @Matches(emailRegExp, {
        message: "'Email' must be a valid E-Mail Format.",
    })
    @IsNotEmpty({ message: 'email cannot be empty!' })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Enter the Password',
        example: 'rahul@123',
        required: true,
    })
    @IsNotEmpty({ message: 'password field cannot be empty!' })
    @IsString()
    password: string;
}
