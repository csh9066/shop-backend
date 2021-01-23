import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
              user: configService.get('GMAIL_ID'),
              pass: configService.get('GMAIL_PASSWORD'),
            },
          },
        };
      },
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
