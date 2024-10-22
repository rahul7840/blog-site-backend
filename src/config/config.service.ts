import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    private get<T>(key: string) {
        const value = this.configService.get<T>(key);
        if (value == null) {
            throw new InternalServerErrorException(
                `app env config error ${key}`,
            );
        }
        return value;
    }
    get jwtPublic(): string {
        let str;
        try {
            str = readFileSync(
                'src/module/auth/certs/private-key.pem',
            ).toString();
        } catch (e) {
            throw new InternalServerErrorException(
                'app env config error - public',
            );
        }
        return str;
    }
    get port(): number {
        return this.get<number>('app.port');
    }

}
