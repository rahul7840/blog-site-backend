import { BadRequestException, Injectable } from '@nestjs/common';
import { AddCommentsDto } from './dto/add.cmts.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
    constructor(private readonly prismaService: PrismaService) {}
    async addcmts(dto: AddCommentsDto, id: string, userId: string) {
        const checkUser = await this.prismaService.user.findFirst({
            where: {
                id: userId,
                isDeleted: false,
            },
        });

        if (!checkUser) throw new BadRequestException('user not found');

        await this.prismaService.comment.create({
            data: {
                content: dto.comment,
                user_id: userId,
                post_id: id,
            },
        });

        return { message: 'Comments on this Post successfully Added' };
    }

    async delete(id: string, userId: string) {
        const [checkUser, checkComment] = await Promise.all([
            this.prismaService.user.findFirst({
                where: {
                    id: userId,
                    isDeleted: false,
                },
            }),
            this.prismaService.comment.findFirst({
                where: {
                    id: id,
                },
            }),
        ]);

        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        if (!checkComment) {
            throw new BadRequestException('Comment with this ID not found');
        }

        const DeleteComment = await this.prismaService.comment.delete({
            where: { id },
        });

        if (!DeleteComment)
            throw new BadRequestException('unable to Delete post');

        const response = {
            id: DeleteComment.id,
            user_id: DeleteComment.user_id,
        };
        return response;
    }
}
