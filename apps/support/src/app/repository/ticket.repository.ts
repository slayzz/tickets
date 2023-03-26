import { InjectModel } from '@nestjs/sequelize';
import { TicketModel } from '../model/ticket.model';
import { TicketEntity } from '../entities/ticket.entity';
import { TicketStateStatus } from '@tickets/interfaces';

export class TicketRepository {
  constructor(
    @InjectModel(TicketModel)
    private readonly ticketModel: typeof TicketModel,
  ) {
  }

  createTicket(ticketEntity: TicketEntity): Promise<TicketModel> {
    const ticket = this.ticketModel.build<TicketModel>({
      question: ticketEntity.question,
      response: ticketEntity.answer,
      state: ticketEntity.state,
      creatorUserId: ticketEntity.creatorUserId,
      answeredUserId: ticketEntity.answeredUserId,
    });
    return ticket.save();
  }

  getTicket(id: number): Promise<TicketModel> {
    return this.ticketModel.findOne({
      where: {
        id,
      }
    });
  }

  async updateTicketStatus(id: number, state: TicketStateStatus): Promise<void> {
    await this.ticketModel.update({ state }, { where: { id } });
  }

  async setTicketAnswer(id: number, answeredUserId: number, answer: string): Promise<void> {
    await this.ticketModel.update({ answeredUserId, answer, state: TicketStateStatus.ANSWERED }, { where: { id } });
  }
}
