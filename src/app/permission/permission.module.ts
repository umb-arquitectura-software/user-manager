import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from 'src/schemas/permission.schema';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService],
  imports: [MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }])],
  exports: [PermissionService],
})
export class PermissionModule {}
