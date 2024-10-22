import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddPost {
    @ApiProperty({
        description: 'enter the Title of the blog',
        example: 'World best cites',
        required: true,
    })
    @IsNotEmpty({ message: 'Title cannot be empty!' })
    title: string;

    @ApiProperty({
        description: 'Enter the content of blog',
        example: 'In most famous cites are ...',
        required: true,
    })
    @IsNotEmpty({ message: 'content field cannot be empty!' })
    @IsString()
    content: string;
}
