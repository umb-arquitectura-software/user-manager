import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RolService } from '../rol/rol.service';
import { CacheService } from '../services/cache/cache.service';
import { config } from 'src/config/config';

@Injectable()
export class UsersService {
  static cache_keys = {
    find_all: 'find-all-users',
  }

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private rolService: RolService,
    private cacheService: CacheService
  ) { }

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.email) throw new BadRequestException('email-required', 'Correo obligatorio');
    if (!createUserDto.username) throw new BadRequestException('username-required', 'Nombre de usuario obligatorio');
    if (!createUserDto.firstName) throw new BadRequestException('firstName-required', 'Nombre es obligatorio');
    if (!createUserDto.lastName) throw new BadRequestException('lastName-required', 'Apellido es obligatorio');
    if (!createUserDto.lastName) throw new BadRequestException('lastName-required', 'Apellido es obligatorio');

    await Promise.all([
      ( async () => {
        const username_repeat = await this.UserModel.findOne({username: createUserDto.username});
        if (username_repeat?._id) throw new BadRequestException('username-already-exists', 'El nombre de usuario ya se encuentra registrado');
    
      }),
      ( async () => {
        const user_repeat_email = await this.UserModel.findOne({email: createUserDto.email});
        if (user_repeat_email?._id) throw new BadRequestException('email-already-exists', 'El correo ya se encuentra registrado');
      })
    ])


    const last_user = await this.UserModel.find().sort({ incremental: -1 }).limit(1).select('incremental').exec();

    const incremental = last_user?.[0]?.incremental ? last_user?.[0]?.incremental + 1 : 1;

    const [password, rol] = await Promise.all([
      bcrypt.hash(createUserDto?.password || createUserDto.email, 8),
      this.rolService.findOneByName(config().defaultRole)
    ]);

    const roles = createUserDto?.roles || []
    if (!roles?.length && !roles.includes(rol?._id?.toString())) {
      roles.push(rol?._id?.toString());
    }


    createUserDto.roles = roles;
    createUserDto.password = password;
    createUserDto.incremental = incremental;

    const createUser = new this.UserModel(createUserDto);

    const create = await createUser.save();
    await this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all);
    return create
  }

  async findAll() {
    return this.UserModel.find().select('-password').exec();
  }

  async findOne(_params: { _id?: string, username?: string }) {
    const user = await this.UserModel.findOne(_params).exec();

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.UserModel.findOne({ email }).exec();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.UserModel.findById(id).exec();
    if (!updatedUser?._id) return 'not found';

    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password, 8);
      updateUserDto.password = password;
    }

    const update = await this.UserModel.findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });
    await this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all);
    return update;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async addRole(data: { _id: string, role_id: string, name_role: string }) {
    if (!data.name_role && !data.role_id) return 'role required';
    if (!data._id) return 'user required';

    const updated = await this.UserModel.findById(data._id).exec();
    if (!updated?._id) return 'not found';
    const _id = updated?._id;

    const role = data.name_role ? await this.rolService.findOneByName(data.name_role) : await this.rolService.findOne(data.role_id);
    const role_id = role?._id?.toString();

    if (updated?.roles.some(role => role?.toString() === role_id)) {
      return 'role already exists';
    }

    const update = await this.UserModel.findOneAndUpdate({ _id }, { $push: { roles: role_id } }, { new: true });
    await this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all);
    return update
  }


  async removeRole(_id: string, role_id: string) {
    const updated = await this.UserModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.UserModel.findOneAndUpdate({ _id }, { $pull: { roles: role_id } }, { new: true });
    await this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all);
    return update;
  }
}
