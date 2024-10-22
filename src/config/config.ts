import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
    jwtSecret: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    port: process.env.PORT,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
}));
