import { IsEmail, IsNotEmpty, IsString, IsArray } from "class-validator";

export class CreateRolDto {
  @IsString()
  _id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  permissions: string[];
}
