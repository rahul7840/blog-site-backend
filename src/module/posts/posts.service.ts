import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPost } from './dto/add.post.dto';
import { UpdatePost } from './dto/update.post.dto';
import { pid, title } from 'process';
import { utils } from 'src/common/helper/utils';

@Injectable()
export class PostsService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly utils: utils,
    ) {}

    async addPost(dto: AddPost, userId: string) {
        const checkUser = await this.prismaService.user.findFirst({
            where: {
                id: userId,
                isDeleted: false,
            },
        });

        if (!checkUser) throw new BadRequestException('user not found');

        const postData = await this.prismaService.$transaction(
            async (prisma) => {
                const post = await prisma.post.create({
                    data: {
                        title: dto.title,
                        content: dto.content,
                        user_id: userId,
                    },
                });
                return {
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    date_of_post: post.date_of_post,
                    user_id: post.user_id,
                };
            },
        );

        return postData;
    }

    async searchPosts(title: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const take = limit;

        const posts = await this.prismaService.post.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
                isDeleted: false,
            },
            skip,
            take,
        });

        const total = await this.prismaService.post.count({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
                isDeleted: false,
            },
        });

        return {
            data: posts,
            total,
        };
    }

    async updatePost(dto: UpdatePost, id: string, userId: string) {
        const [checkUser, checkPost] = await Promise.all([
            this.prismaService.user.findFirst({
                where: {
                    id: userId,
                    isDeleted: false,
                },
            }),
            this.prismaService.post.findFirst({
                where: {
                    id: id,
                    isDeleted: false,
                },
            }),
        ]);

        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        if (!checkPost) {
            throw new BadRequestException('Post with this ID not found');
        }

        const UpdatePost = await this.prismaService.post.update({
            where: { id: id },
            data: {
                title: dto.title,
                content: dto.content,
            },
        });

        if (!UpdatePost) throw new BadRequestException('unable to update');

        const response = {
            id: UpdatePost.id,
            title: UpdatePost.title,
            content: UpdatePost.content,
            user_id: UpdatePost.user_id,
        };

        return response;
    }

    async getAllPost(page = 1, limit = 10) {
        const { skip, take } = this.utils.calculatePagination(page, limit);

        const result = await this.prismaService.post.findMany({
            where: {
                isDeleted: false,
            },
            select: {
                id: true,
                title: true,
                content: true,
                date_of_post: true,
                User: {
                    select: {
                        name: true,
                    },
                },
                Comment: {
                    select: {
                        id: true,
                        content: true,
                        User: {
                            select: {
                                name: true,
                                id: true,
                            },
                        },
                    },
                },
            },
            take,
            skip,
        });

        const formattedResult = result.map((post) => ({
            id: post.id,
            title: post.title,
            content: post.content,
            date_of_post: post.date_of_post,
            author_name: post.User.name,
            comments: post.Comment.map((comment) => ({
                comment_id: comment.id,
                user_id: comment.User.id,
                name: comment.User.name,
                comment: comment.content,
            })),
        }));

        return formattedResult;
    }
    
    async delete(id: string, userId: string) {
        const [checkUser, checkPost] = await Promise.all([
            this.prismaService.user.findFirst({
                where: {
                    id: userId,
                    isDeleted: false,
                },
            }),
            this.prismaService.post.findFirst({
                where: {
                    id: id,
                    isDeleted: false,
                },
            }),
        ]);

        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        if (!checkPost) {
            throw new BadRequestException('Post with this ID not found');
        }

        const DeletePost = await this.prismaService.post.update({
            where: { id },
            data: {
                isDeleted: true,
            },
        });

        if (!DeletePost) throw new BadRequestException('unable to Delete post');

        const response = {
            id: DeletePost.id,
            title: DeletePost.title,
            is_deleted: DeletePost.isDeleted,
        };
        return response;
    }
}
