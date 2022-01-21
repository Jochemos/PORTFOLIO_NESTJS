import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import PresentUser from 'database/dto/login.model';
import LoginService from 'src/auth/login/login.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private loginService: LoginService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<PresentUser> {
    const user = await this.loginService.validateUser(email, password);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
