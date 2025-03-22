import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
  //poner _id de mongoose
  @IsString()
  _id?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password?: string;

  @IsString()
  username: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  cellPhone: string;

  @IsNumber()
  incremental?: number;


  @IsArray()
  roles?: string[];

  @IsBoolean()
  status?: boolean;
}