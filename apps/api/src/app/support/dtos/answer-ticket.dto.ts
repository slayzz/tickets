import { IsString } from 'class-validator';

export class AnswerTicketDto {
  @IsString()
  answer: string;
}
