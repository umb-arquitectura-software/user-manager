import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';
import { GoogleAuthGuard } from './google/google-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }


  @UseGuards(GoogleAuthGuard)
  @Post('/login-google')
  async loginGoogle(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }
}
