import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
} from 'class-validator';
import { pwdRegExp } from 'src/common/types/reg.exp.types';

enum Type {
    CUSTOMER = 'customer',
    ADMIN = 'admin',
}

export class SignupDto {
    @ApiProperty({
        description: 'Enter the fullName of the user',
        example: 'John Doe',
    })
    @IsString()
    @IsNotEmpty()
    Name: string;

    @ApiProperty({
        description: 'enter the email of the user',
        example: 'john@example.com',
        required: true,
    })
    @IsEmail()
    Email: string;

    @ApiProperty({
        description: 'Enter the Password',
        example: 'rahul@123',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(pwdRegExp, {
        message:
            'Password must be at least 8 characters long, contain at least one letter, one number, and one special character.',
    })
    Password: string;
}
