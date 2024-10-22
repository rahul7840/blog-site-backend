import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddCommentsDto {
  
    @ApiProperty({
        description: 'Enter the content of blog',
        example: 'very use-full blog',
        required: true,
    })
    @IsNotEmpty({ message: 'content field cannot be empty!' })
    @IsString()
    comment: string;
}
