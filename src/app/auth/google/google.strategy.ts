import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-custom';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private usersService: UsersService, private authService: AuthService) {
    super();
  }

  async validate(req: Request & { body: {email: string} }): Promise<any> {
    const { email } = req.body;
    if (!email) throw new UnauthorizedException('email-required', 'Correo obligatorio');
    let user = await this.usersService.findOne({email});
    if (!user?._id) throw new UnauthorizedException('user_not_found', 'El usuario no existe');

    return user;
  }
}