import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import Redis from 'ioredis';

@Module({
  imports: [],
  controllers: [AppController, TokenController],
  providers: [
    AppService,
    TokenService,
    {
      provide: 'REDIS_PUB_CLIENT',
      useFactory: () => {
        return new Redis();
      },
    },
    {
      provide: 'REDIS_SUB_CLIENT',
      useFactory: () => {
        return new Redis();
      },
    },
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis();
      },
    },
  ],
})
export class AppModule {}
