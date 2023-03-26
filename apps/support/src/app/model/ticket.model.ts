import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  AllowNull,
  DataType, Model,
} from 'sequelize-typescript';
import { ITicket, TicketStateStatus } from '@tickets/interfaces';


@Table({
  tableName: 'tickets',
})
export class TicketModel extends Model implements ITicket {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  question: string;

  @AllowNull
  @Column
  answer: string | null;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TicketStateStatus),
  })
  state: TicketStateStatus;

  @Column
  creatorUserId: number;

  @AllowNull
  @Column
  answeredUserId: number | null;
}
