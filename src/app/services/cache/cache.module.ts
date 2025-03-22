import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { CacheModule as cache } from '@nestjs/cache-manager';

@Module({
  imports: [
    cache.register({
      max: 100,
      ttl: 0,
      isGlobal: true,
      // store: redisStore,
      // ...credentials
    })
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class CacheModule {}
