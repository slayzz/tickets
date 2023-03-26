import { Column, Model, Table, Unique, IsEmail, PrimaryKey, AutoIncrement, Index } from 'sequelize-typescript';
import { IUser } from '@tickets/interfaces';

@Table({
  tableName: 'users',
})
export class UserModel extends Model implements IUser {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Index
  @Unique
  @IsEmail
  @Column
  email: string;

  @Column
  fullName: string;

  @Column
  passwordHash: string;

}
