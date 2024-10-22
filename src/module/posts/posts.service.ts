import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPost } from './dto/add.post.dto';
import { UpdatePost } from './dto/update.post.dto';
import { pid } from 'process';
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

        await this.prismaService.$transaction(async (prisma) => {
            const post = await prisma.post.create({
                data: {
                    title: dto.title,
                    content: dto.content,
                    user_id: userId,
                },
            });
            return post;
        });

        return { message: 'Post successfully Added' };
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

        return UpdatePost;
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
                        content: true,
                    },
                },
            },
            take,
            skip,
        });

        return result;
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

        return DeletePost;
    }
}
