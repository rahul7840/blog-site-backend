import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module/prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ResponseInterceptor } from './common/Interceptor/response.interceptor';
import { AllExceptionsFilter } from './common/filter/all.exception.filter';
import { HttpExceptionFilter } from './common/filter/http.exception.filter';
import { AuthModule } from './module/auth/auth.module';
import { PostsModule } from './module/posts/posts.module';
import { AppConfigModule } from './config/config.module';
import { CommentsModule } from './module/comments/comments.module';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        PostsModule,
        CommentsModule,
        AppConfigModule,
    ],
    controllers: [AppController],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
        { provide: APP_FILTER, useClass: AllExceptionsFilter },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
        { provide: APP_PIPE, useClass: ValidationPipe },
        AppService,
    ],
})
export class AppModule {}
