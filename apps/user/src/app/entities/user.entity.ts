import { IUser } from '@tickets/interfaces';
import { genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
  id?: number;
  fullName: string;
  passwordHash: string;
  email: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.fullName = user.fullName;
    this.passwordHash = user.passwordHash;
    this.email = user.email;
  }

  getPublicProfile() {
    return {
      id: this.id,
      fullName: this.fullName,
      email: this.email,
    }
  }

  async setPassword(password) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

}
