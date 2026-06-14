import { Module } from '@nestjs/common';
import { ResultatsController } from './resultats.controller';
import { ResultatsService } from './resultats.service';
import { DonneursModule } from '../donneurs/donneurs.module';

@Module({
  imports: [DonneursModule],
  controllers: [ResultatsController],
  providers: [ResultatsService],
})
export class ResultatsModule {}