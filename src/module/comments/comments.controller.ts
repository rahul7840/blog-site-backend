import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AddCommentsDto } from './dto/add.cmts.dto';
import {
    ApiBearerAuth,
    ApiResponse,
    ApiOperation,
    ApiTags,
    ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiError } from 'src/common/helper/error_description';
import { PostsService } from '../posts/posts.service';
import { CommentsService } from './comments.service';

@Controller('comments')
@ApiTags('Comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get('list')
    @ApiTags('Blog-Post')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'get only MY COMMENTS',
        description: 'get only MY COMMENTS',
    })
    async allDevices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Request() req,
    ) {
        const userId = req.user.id;
        return await this.commentService.getMyCmts(page, limit, userId);
    }

    @Post(':postId')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'Add comment on Post',
        description: 'Add comment on Post',
    })
    async addPost(
        @Body() dto: AddCommentsDto,
        @Param('postId') id: string,
        @Request() req,
    ) {
        const userId = req.user.id;
        return await this.commentService.addcmts(dto, id, userId);
    }

    @Delete(':commentId')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: ApiError.SUCCESS_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: ApiError.UNAUTHORIZED_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: ApiError.INTERNAL_SERVER_ERROR_MESSAGE,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: ApiError.BAD_REQUEST,
    })
    @ApiOperation({
        summary: 'Delete comments',
        description: 'Delete comments',
    })
    async Delete(@Param('commentId') id: string, @Request() req) {
        const userId = req.user.id;
        return await this.commentService.delete(id, userId);
    }
}
