import { getDatabase, ref, onValue, set } from 'firebase/database';
import { app } from './firebase.config';

const db = getDatabase(app);

export function ecouterDerniereDetection(ambulanceId, callback) {
  const detectionRef = ref(db, 'ambulances/' + ambulanceId + '/derniere_detection');
  const unsubscribe = onValue(detectionRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      callback({
        groupe: data.groupe_sanguin,
        confiance: data.confiance,
        timestamp: data.timestamp,
        patient_id: data.patient_id,
        ambulance_id: data.ambulance_id,
        hopital: data.hopital,
        statut: data.statut,
        eta: data.eta
      });
    }
  });
  return unsubscribe;
}

export function ecouterStatutAmbulance(ambulanceId, callback) {
  const statusRef = ref(db, 'ambulances/' + ambulanceId + '/status');
  return onValue(statusRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : 'deconnecte');
  });
}

export async function envoyerAlerteHopital(hopitalId, alerte) {
  const alerteRef = ref(db, 'hopitaux/' + hopitalId + '/alertes/' + Date.now());
  await set(alerteRef, {
    groupe_sanguin: alerte.groupe_sanguin,
    ambulance_id: alerte.ambulance_id,
    timestamp: new Date().toISOString(),
    lu: false
  });
}