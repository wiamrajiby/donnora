import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { firestore } from '../firebase/firebase.config';

const COMPAT: Record<string, string[]> = {
  'O-':  ['O-'],
  'O+':  ['O-', 'O+'],
  'A-':  ['O-', 'A-'],
  'A+':  ['O-', 'O+', 'A-', 'A+'],
  'B-':  ['O-', 'B-'],
  'B+':  ['O-', 'O+', 'B-', 'B+'],
  'AB-': ['O-', 'A-', 'B-', 'AB-'],
  'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
};

@Injectable()
export class DonneursService {

  async findAll() {
    try {
      const snap = await firestore.collection('donneurs').get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      throw new HttpException('Erreur récupération donneurs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const doc = await firestore.collection('donneurs').doc(id).get();
      if (!doc.exists) throw new HttpException('Donneur non trouvé', HttpStatus.NOT_FOUND);
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findCompatibles(groupePatient: string) {
    try {
      const groupesCompatibles = COMPAT[groupePatient] || [];
      if (groupesCompatibles.length === 0) {
        throw new HttpException('Groupe sanguin invalide', HttpStatus.BAD_REQUEST);
      }
      const snap = await firestore.collection('donneurs')
        .where('groupe_sanguin', 'in', groupesCompatibles)
        .where('disponible', '==', true)
        .get();
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur serveur', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: any) {
    try {
      if (!data.nom || !data.groupe_sanguin || !data.telephone) {
        throw new HttpException('Champs manquants : nom, groupe_sanguin, telephone', HttpStatus.BAD_REQUEST);
      }
      const ref = await firestore.collection('donneurs').add({
        ...data,
        disponible: true,
        nb_dons: 0,
        created_at: new Date().toISOString(),
      });
      return { id: ref.id, message: 'Donneur créé avec succès' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur création', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: any) {
    try {
      const doc = await firestore.collection('donneurs').doc(id).get();
      if (!doc.exists) throw new HttpException('Donneur non trouvé', HttpStatus.NOT_FOUND);
      await firestore.collection('donneurs').doc(id).update(data);
      return { id, message: 'Donneur mis à jour' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur mise à jour', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    try {
      const doc = await firestore.collection('donneurs').doc(id).get();
      if (!doc.exists) throw new HttpException('Donneur non trouvé', HttpStatus.NOT_FOUND);
      await firestore.collection('donneurs').doc(id).delete();
      return { id, message: 'Donneur supprimé' };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Erreur suppression', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}