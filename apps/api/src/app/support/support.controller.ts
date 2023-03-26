import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException, Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards, UsePipes, ValidationPipe
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  SupportAnswerTicketCommand,
  SupportChangeStatusTicketCommand,
  SupportCreateTicketCommand,
  SupportGetTicketQuery
} from '@tickets/contracts';
import { EXHANGES } from '@tickets/rmq';
import { User } from '../guards/user.decorator';
import { IJWTUser } from '@tickets/interfaces';
import { CreateTicketDto } from './dtos/create-ticket.dto';
import { ChangeTicketStatusDto } from './dtos/change-ticket-status.dto';
import { AnswerTicketDto } from './dtos/answer-ticket.dto';

@Controller('support/ticket')
export class SupportController {
  private logger = new Logger(SupportController.name);
  constructor(
    private readonly amqpConnection: AmqpConnection,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Get(':ticketId')
  async getTicket(@Param() { ticketId }) {
    const { error, payload } = await this.amqpConnection.request<SupportGetTicketQuery.Response>({
      exchange: EXHANGES.ticket.name,
      routingKey: SupportGetTicketQuery.topic,
      payload: { id: ticketId },
    });

    if (error) {
      if (error.message === 'ticket_not_found') {
        throw new NotFoundException();
      }
      this.logger.error(`${error.name}: ${error.message}`);
      throw new InternalServerErrorException();
    }

    const { ticket } = payload;

    return { ticket };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTicket(@User() { id }: IJWTUser, @Body() { question }: CreateTicketDto) {
    const { error, payload } = await this.amqpConnection.request<SupportCreateTicketCommand.Response>({
      exchange: EXHANGES.ticket.name,
      routingKey: SupportCreateTicketCommand.topic,
      payload: { userId: id, question },
    });

    if (error) {
      this.logger.error(`${error.name}: ${error.message}`);
      throw new InternalServerErrorException();
    }
    const { ticket } = payload;

    return { ticket };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Put('/:ticketId/status')
  async updateTicketStatus(@Param() { ticketId }, @Body() { status }: ChangeTicketStatusDto) {
    const { error, payload } = await this.amqpConnection.request<SupportChangeStatusTicketCommand.Response>({
      exchange: EXHANGES.ticket.name,
      routingKey: SupportChangeStatusTicketCommand.topic,
      payload: { id: ticketId, status },
    });
    if (error) {
      if (error.message === 'cant_change_status') {
        throw new BadRequestException('Status for current ticket is wrong');
      }
      this.logger.error(`${error.name}: ${error.message}`);
      throw new InternalServerErrorException();
    }

    const { ticket } = payload;
    return { ticket };
  }

  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  @Post('/:ticketId/answer')
  async answer(@User() { id }: IJWTUser, @Param() { ticketId }, @Body() { answer }: AnswerTicketDto) {
    const { error, payload } = await this.amqpConnection.request<SupportAnswerTicketCommand.Response>({
      exchange: EXHANGES.ticket.name,
      routingKey: SupportAnswerTicketCommand.topic,
      payload: {
        id: ticketId,
        answeredUserId: id,
        answer: answer,
      },
    });
    if (error) {
      if (error.message === 'cant_answer_with_wrong_status') {
        throw new BadRequestException('Cant answer on ticket with wrong status');
      }
      this.logger.error(`${error.name}: ${error.message}`);
      throw new InternalServerErrorException();
    }

    const { ticket } = payload;
    return { ticket };
  }
}
