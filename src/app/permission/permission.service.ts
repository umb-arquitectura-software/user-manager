import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from 'src/schemas/permission.schema';

@Injectable()
export class PermissionService {

  constructor(@InjectModel(Permission.name) private PermissionModel: Model<Permission>) { }


  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = new this.PermissionModel(createPermissionDto);
    return createPermission.save();
  }

  async findAll() {
    return this.PermissionModel.find().exec();
  }

  async findOne(_id: string) {
    const find = await this.PermissionModel.findById(_id).exec();
    return find;
  }

  async update(_id: string, updatePermissionDto: UpdatePermissionDto) {
    const updated = await this.PermissionModel.findById(_id).exec();
    if (!updated?._id) return 'not found';

    return this.PermissionModel.findOneAndUpdate({ _id }, { $set: updatePermissionDto }, { new: true });
  }

  remove(_id: string) {
    return `This action removes a #${_id} rol`;
  }
}
