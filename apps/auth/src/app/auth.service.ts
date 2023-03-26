import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { IUser } from '@tickets/interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  validatePassword(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }

  signJwt(user: IUser): Promise<string> {
    return this.jwtService.signAsync({ id: user.id, fullName: user.fullName, email: user.email })
  }
}
