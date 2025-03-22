import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PopulateOptions } from 'mongoose';

import { Rol } from 'src/schemas/rol.schema';
import { CacheService } from '../services/cache/cache.service';

@Injectable()
export class RolService {
  static cache_keys = {
    find_all: 'find-all-rols',
  }

  constructor(
    @InjectModel(Rol.name) private RolModel: Model<Rol>,
    private cacheService: CacheService
  ) { }

  async create(createRolDto: CreateRolDto) {
    const createRol = new this.RolModel(createRolDto);
    const save = await createRol.save();
    await this.cacheService.deleteCacheKey(RolService.cache_keys.find_all);
    return save;
  }

  async findAll(where?: any, populate?: PopulateOptions, select: string = '-updatedAt') {
    return this.RolModel.find(where).populate(populate).select(select).exec();
  }

  async findOne(_id: string) {
    const find = await this.RolModel.findById(_id).exec();
    return find;
  }

  async findOneByName(name: string) {
    const find = await this.RolModel.findOne({ name }).exec();
    if (!find) throw 'Rol not found';

    return find;
  }


  async update(_id: string, updateRolDto: UpdateRolDto) {
    const updated = await this.RolModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.RolModel.findOneAndUpdate({ _id }, { $set: updateRolDto }, { new: true });
    await this.cacheService.deleteCacheKey(RolService.cache_keys.find_all);
    return update
  }

  remove(_id: string) {
    return `This action removes a #${_id} rol`;
  }


  async removePermission(_id: string, permissionId: string) {
    const updated = await this.RolModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    const update = await this.RolModel.findOneAndUpdate({ _id }, { $pull: { permissions: permissionId } }, { new: true });
    await this.cacheService.deleteCacheKey(RolService.cache_keys.find_all);
    return update
  }


  async addPermission(data: {_id?: string, name?: string, permission_id: string}) {
    const where = data?._id ? {_id: data?._id} : {name: data?.name};

    const updated = await this.RolModel.findOne(where).exec();
    if (!updated?._id) return 'not found';
    const _id = updated?._id;

    if (updated?.permissions.some(permission => permission?.toString() === data.permission_id?.toString())) {
      return 'permission already exists';
    }

    const update = await this.RolModel.findOneAndUpdate({ _id }, { $push: { permissions: data.permission_id } }, { new: true });
    await this.cacheService.deleteCacheKey(RolService.cache_keys.find_all);
    return update
  }


}
