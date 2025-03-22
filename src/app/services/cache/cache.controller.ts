import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    await this.cacheService.setCacheKey(key, value);
    return {
      success: true,
      status: 201,
      message: 'Key cached successfully',
    };
  }

  @Get('/get/:key')
  async getCacheKey(@Param('key') key: string) {
    const data = await this.cacheService.getCacheKey(key);
    return {
      success: true,
      status: 200,
      data,
    };
  }

  @Delete('/:key')
  async deleteCacheKey(@Param('key') key: string) {
    await this.cacheService.deleteCacheKey(key);
    return {
      success: true,
      status: 201,
      message: 'Key deleted successfully',
    };
  }

  @Get('/reset')
  async resetCache() {
    await this.cacheService.resetCache();
    return {
      success: true,
      status: 200,
      message: 'Cache cleared successfully',
    };
  }

  @Get('/store')
  async cacheStore() {
    const store = await this.cacheService.cacheStore();
    return {
      success: true,
      status: 200,
      data: store,
    };
  }
}
