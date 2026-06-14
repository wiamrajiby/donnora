import { Controller, Post, Body } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly svc: NotificationsService) {}

  @Post('hopital')
  alerterHopital(@Body() body: any) {
    return this.svc.alerterHopital(body);
  }
}