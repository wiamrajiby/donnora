import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { messaging } from '../firebase/firebase.config';

@Injectable()
export class NotificationsService {

  async alerterHopital(data: any) {
    try {
      if (!data.groupe_sanguin || !data.ambulance_id) {
        throw new HttpException('groupe_sanguin et ambulance_id obligatoires', HttpStatus.BAD_REQUEST);
      }
      const message = {
        notification: {
          title: `URGENT — Groupe sanguin ${data.groupe_sanguin}`,
          body: `Ambulance ${data.ambulance_id} — Arrivée dans ${data.eta || '10 min'} — ${data.nb_donneurs || 0} donneurs compatibles`,
        },
        topic: `hopital_${data.hopital_id || 'casablanca'}`,
        data: {
          type: 'nouvelle_detection',
          groupe_sanguin: data.groupe_sanguin,
          ambulance_id: data.ambulance_id,
          confiance: String(data.confiance || 0),
          route: '/result',
        },
        android: {
          priority: 'high' as const,
          notification: { sound: 'default', channelId: 'urgences' },
        },
      };
      const response = await messaging.send(message);
      return { success: true, messageId: response };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur envoi notification', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}