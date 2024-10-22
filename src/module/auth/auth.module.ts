import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import * as fs from 'fs';
import { JwtModule } from '@nestjs/jwt';
import { utils } from 'src/common/helper/utils';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';

@Module({
    imports: [
        PrismaModule,
        JwtModule.register({
            global: true,
            signOptions: {
                algorithm: 'RS256',
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
            privateKey: fs.readFileSync(
                'src/module/auth/certs/private-key.pem',
            ),

            publicKey: fs.readFileSync('src/module/auth/certs/public-key.pem'),
        }),
    ],
    controllers: [AuthController ],
    providers: [AuthService,JwtStrategy, utils],
})
export class AuthModule {}
