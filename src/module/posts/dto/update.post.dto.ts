import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePost {
    @ApiProperty({
        description: 'enter the Title of the blog',
        example: 'Top ten cars',
    })
    @IsOptional()
    title: string;

    @ApiProperty({
        description: 'Enter the content of blog',
        example: 'Best can came under the ...',
    })
    @IsOptional()
    content: string;
}
