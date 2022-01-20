import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { LoginService } from '../login/login.service';
import { PresentUser } from 'database/dto/login.model';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
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
