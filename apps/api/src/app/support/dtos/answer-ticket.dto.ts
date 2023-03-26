import { IsEnum, IsString } from 'class-validator';
import { TicketStateStatus } from '@tickets/interfaces';

export class AnswerTicketDto {
  @IsString()
  answer: string;
}
