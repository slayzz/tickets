import { InjectModel } from '@nestjs/sequelize'
import { Injectable } from '@nestjs/common';
import { UserModel } from '../models/user.model';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {
  }

  createUser(user: UserEntity): Promise<UserModel> {
    const userModel = this.userModel.build({
      passwordHash: user.passwordHash,
      email: user.email,
      fullName: user.fullName,
    });
    return userModel.save();
  }

  findUser(email: string): Promise<UserModel | null> {
    return this.userModel.findOne({
      where: {
        email,
      }
    });
  }
}
