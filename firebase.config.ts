import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';
import { getDatabase } from 'firebase-admin/database';
import * as serviceAccount from '../../serviceAccountKey.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: 'https://donnora-default-rtdb.europe-west1.firebasedatabase.app',
  });
}

export const firestore = getFirestore();
export const messaging = getMessaging();
export const realtimeDb = getDatabase();