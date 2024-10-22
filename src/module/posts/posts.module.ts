import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { utils } from 'src/common/helper/utils';

@Module({
    imports: [PrismaModule],
    providers: [PostsService, utils],
    controllers: [PostsController],
})
export class PostsModule {}
