import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from 'src/schemas/rol.schema';
import { CacheModule } from '../services/cache/cache.module';
import { CacheService } from '../services/cache/cache.service';

@Module({
  controllers: [RolController],
  providers: [RolService, CacheService],
  imports: [MongooseModule.forFeature([{ name: Rol.name, schema: RolSchema }]), CacheModule],
  exports: [RolService],
})
export class RolModule {}
