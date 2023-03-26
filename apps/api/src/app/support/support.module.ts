import { Module } from '@nestjs/common';
import { SupportController } from './support.controller';
import { RmqModule } from '@tickets/rmq';

@Module({
  imports: [
    RmqModule,
  ],
  controllers: [SupportController],
})
export class SupportModule {
}
