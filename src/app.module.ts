import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

import { DatabaseModule } from './database/database.module';
import { LangueModule } from './langue/langue.module';
import { Throttle, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrotttlerBehindProxyGuard } from './guards/throttle-behind-proxy.guard';

@Module({
  imports: [ThrottlerModule.forRoot([
    {
      name: 'short',
      ttl:1000,
      limit:3 
    },
   {
      name: 'medium',
      ttl:10000,
      limit:10
    },
   {
      name: 'short',
      ttl:100000,
      limit:100 
    },
  ]),UsersModule, DatabaseModule,LangueModule],
  controllers: [AppController,  UsersController],
  providers: [
    {
      provide: APP_GUARD,
      useClass : ThrotttlerBehindProxyGuard
    },
    AppService, UsersService], ///activation dans le provider

})
export class AppModule {}
