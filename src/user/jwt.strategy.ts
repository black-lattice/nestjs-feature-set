import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'zxcvbnmasdfghj',
    });
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      mobile: payload.mobile,
      nickname: payload.nickname,
    };
  }
}
