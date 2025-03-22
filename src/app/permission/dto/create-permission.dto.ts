import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  _id?: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
