import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { PermissionModule } from './app/permission/permission.module';
import { CacheModule } from './app/services/cache/cache.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { RolModule } from './app/rol/rol.module';

import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRoot(config().mongodb.database.connectionString),
    CacheModule,
    UsersModule,
    AuthModule,
    PermissionModule,
    RolModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
