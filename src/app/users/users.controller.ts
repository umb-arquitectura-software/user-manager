import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';

@Controller('users')
@UseInterceptors(CacheInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CacheKey(UsersService.cache_keys.find_all)
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  findOne(@Body() data: CreateUserDto) {
    return this.usersService.findOne(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('add-role')
  addRole(@Body() data: {_id: string, role_id: string, name_role: string}) {
    return this.usersService.addRole(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-role')
  removeRole(@Body() data: {_id: string, roleId: string}) {
    return this.usersService.removeRole(data?._id, data?.roleId);
  }
}
