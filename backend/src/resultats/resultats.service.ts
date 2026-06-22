import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { firestore, messaging } from '../firebase/firebase.config';
import { DonneursService } from '../donneurs/donneurs.service';

@Injectable()
export class ResultatsService {
  constructor(private donneursService: DonneursService) {}

  async enregistrer(data: any) {
    try {
      if (!data.patient_id || !data.groupe_sanguin_detecte || !data.confiance) {
        throw new HttpException('Champs obligatoires manquants', HttpStatus.BAD_REQUEST);
      }
      const resultat = {
        patient_id: data.patient_id,
        groupe_sanguin_detecte: data.groupe_sanguin_detecte,
        confiance: data.confiance,
        timestamp: new Date().toISOString(),
        ambulance_id: data.ambulance_id,
        hopital: data.hopital || 'CHU Casablanca',
        statut: data.confiance >= 90 ? 'transmis' : 'faible_confiance',
        date: new Date().toLocaleDateString('fr-FR'),
        heure: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      };
      const ref = await firestore.collection('resultats').add(resultat);
      const donneurs = await this.donneursService.findCompatibles(data.groupe_sanguin_detecte);
      const nbDonneurs = donneurs.length;
      await firestore.collection('resultats').doc(ref.id).update({ donneurs_trouves: nbDonneurs });
      await this.envoyerNotificationHopital({
        groupe: data.groupe_sanguin_detecte,
        confiance: data.confiance,
        ambulance: data.ambulance_id,
        nbDonneurs,
      });
      return { id: ref.id, ...resultat, donneurs_trouves: nbDonneurs };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur enregistrement', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      const snap = await firestore.collection('resultats')
        .orderBy('timestamp', 'desc')
        .limit(50)
        .get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      throw new HttpException('Erreur récupération', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const doc = await firestore.collection('resultats').doc(id).get();
      if (!doc.exists) throw new HttpException('Résultat non trouvé', HttpStatus.NOT_FOUND);
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async envoyerNotificationHopital(data: any) {
    try {
      const message = {
        notification: {
          title: `Nouveau groupe sanguin détecté — ${data.groupe}`,
          body: `${data.ambulance} — ${data.nbDonneurs} donneurs disponibles`,
        },
        topic: 'hopital_casablanca',
        data: {
          groupe_sanguin: data.groupe,
          confiance: String(data.confiance),
          route: '/result',
        },
      };
      await messaging.send(message);
    } catch (error) {
      console.error('Erreur FCM (non bloquant):', error);
    }
  }
}