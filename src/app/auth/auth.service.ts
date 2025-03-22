import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RolService } from '../rol/rol.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolService: RolService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email: email });
    if (!user) return null;

    const passwordMatches = await bcrypt.compare(pass, user.password);

    if (passwordMatches) return user;

    return null;
  }

  async login(user: CreateUserDto) {
    const payload = { email: user?.email, sub: user?._id };
    delete user.password;

    return {
      permissions: user?.roles?.length ? await this.cacheRolesPermissions(user?.roles) : [],
      user: user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async cacheRolesPermissions(roles: string[]): Promise<string[]> {
    if (!roles?.length) return []

    const roles_data = await this.rolService.findAll({ _id: { $in: roles } }, {path: 'permissions', select: 'name'}, 'permissions');
    const permissions: any[] = roles_data.map(rol => rol.permissions).flat();

    return permissions?.map(permission => permission.name);
  }

  async signUp(user: CreateUserDto) {
    const createUser = await this.usersService.create(user);
    return this.login(createUser as any);
  }
}