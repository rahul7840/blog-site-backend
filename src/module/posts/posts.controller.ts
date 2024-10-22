import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
    ApiResponse,
    ApiOperation,
    ApiBearerAuth,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { ApiError } from 'src/common/helper/error_description';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AddPost } from './dto/add.post.dto';
import { UpdatePost } from './dto/update.post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get('list')
    @ApiTags('Blog-Post')
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
        summary: 'List all blogs for all users with pagination',
        description: 'List all blogs for all users with pagination',
    })
    async allDevices(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
    ) {
        return await this.postService.getAllPost(page, limit);
    }

    @Get('search')
    @ApiTags('Search')
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
        summary: 'Search post using TITLE only ',
        description: 'Search post using TITLE only',
    })
    @ApiQuery({ name: 'page', required: false })
    @ApiQuery({ name: 'limit', required: false })
    async search(
        @Query('title') title: string,
        @Query('page') page = 1,
        @Query('limit') limit = 10,
    ) {
        return this.postService.searchPosts(title, page, limit);
    }

    @Post()
    @ApiTags('Blog-Post')
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
        summary: 'Add blog-post to the website',
        description: 'Add blog to the website',
    })
    async addPost(@Body() dto: AddPost, @Request() req) {
        const userId = req.user.id;
        return await this.postService.addPost(dto, userId);
    }

    @Patch(':id')
    @ApiTags('Blog-Post')
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
        summary: 'Update blog-post to the website',
        description: 'Update blog-post to the website',
    })
    async update(
        @Body() dto: UpdatePost,
        @Param('id') id: string,
        @Request() req,
    ) {
        const userId = req.user.id;
        return await this.postService.updatePost(dto, id, userId);
    }

    @Delete(':id')
    @ApiTags('Blog-Post')
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
        summary: 'Delete blog-post to the website',
        description: 'Delete blog-post to the website',
    })
    async Delete(@Param('id') id: string, @Request() req) {
        const userId = req.user.id;
        return await this.postService.delete(id, userId);
    }
}
