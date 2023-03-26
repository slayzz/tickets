import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { IJWTUser } from '@tickets/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => {
        return req.headers['authorization'].split('Bearer ')[1];
      }]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(jwtUser: IJWTUser) {
    return jwtUser;
  }
}

