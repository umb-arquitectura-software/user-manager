import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.permissionService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(_id, updatePermissionDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.permissionService.remove(_id);
  }
}
