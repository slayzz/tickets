import { IsEnum } from 'class-validator';
import { TicketStateStatus } from '@tickets/interfaces';

export class ChangeTicketStatusDto {
  @IsEnum(TicketStateStatus)
  status: TicketStateStatus;
}
