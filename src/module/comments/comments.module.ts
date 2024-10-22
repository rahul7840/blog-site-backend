import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { utils } from 'src/common/helper/utils';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService,utils]
})
export class CommentsModule {}
