import { Module } from '@nestjs/common';
import { DonneursController } from './donneurs.controller';
import { DonneursService } from './donneurs.service';

@Module({
  controllers: [DonneursController],
  providers: [DonneursService],
  exports: [DonneursService],
})
export class DonneursModule {}