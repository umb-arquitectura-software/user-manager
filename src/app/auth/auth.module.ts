import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { GoogleStrategy } from './google/google.strategy';
import { RolModule } from '../rol/rol.module';


@Module({
  imports: [UsersModule, PassportModule, RolModule,
    JwtModule.register({
      secret: 'secret', //TODO Almacenar en otro lado
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, LocalStrategy, JwtStrategy],
})
export class AuthModule {}