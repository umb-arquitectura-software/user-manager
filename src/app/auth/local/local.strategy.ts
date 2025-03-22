import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(req: Request & { body: {email: string, password: string} }): Promise<any> {
    const user = await this.authService.validateUser(req?.body?.email, req?.body?.password);
    if (!user) throw new UnauthorizedException('user_not_found', 'Correo o contraseña incorrectos');
    return user;
  }
}