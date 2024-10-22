import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/module/prisma/prisma.service';

@Injectable()
export class utils {
    constructor(private readonly prismaService: PrismaService) {}
    async hashPassword(password) {
        const saltOrRounds = 10;
        return bcrypt.hash(password, saltOrRounds);
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    public calculatePagination(page: number, limit: number) {
        const correctedPage = Math.max(1, page);
        const correctedLimit = Math.min(Math.max(1, limit), 100);
        const skip = (correctedPage - 1) * correctedLimit;
        const take = correctedLimit;
        return { skip, take };
    }
}
