import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('rol')
@UseInterceptors(CacheInterceptor)
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  @CacheKey(RolService.cache_keys.find_all)
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.rolService.findOne(_id);
  }

  @Patch(':_id')
  update(@Param('_id') _id: string, @Body() updateRolDto: UpdateRolDto) {
    return this.rolService.update(_id, updateRolDto);
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.rolService.remove(_id);
  }

  @Post('add-permission')
  addPermission(@Body() data: {_id?: string, name?: string, permission_id: string}) {
    return this.rolService.addPermission(data);
  }

  @Post('remove-permission')
  removePermission(@Body() data: {_id: string, permissionId: string}) {
    return this.rolService.removePermission(data?._id, data?.permissionId);
  }
}
