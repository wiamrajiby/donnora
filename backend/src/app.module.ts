import { Module } from '@nestjs/common';
import { DonneursModule } from './donneurs/donneurs.module';
import { ResultatsModule } from './resultats/resultats.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    DonneursModule,
    ResultatsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
