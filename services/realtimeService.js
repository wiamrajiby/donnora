// services/realtimeService.js
// Personne 4 — Intégration du service temps réel de Personne 5
// Ce fichier est écrit par Personne 5 et intégré par Personne 4 dans les pages

import { getDatabase, ref, onValue, set } from "firebase/database";
import app from "./firebase.config";

const db = getDatabase(app);

// ── Écouter la dernière détection d'une ambulance en temps réel ──
// INTÉGRATION dans pages/result.js :
//   useEffect(() => {
//     const unsub = ecouterDerniereDetection("AMB-03", setDetection);
//     return unsub;
//   }, []);
export function ecouterDerniereDetection(ambulanceId, callback) {
  const detectionRef = ref(db, "ambulances/" + ambulanceId + "/derniere_detection");
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
  return unsubscribe; // Retourner pour arrêter l'écoute quand on quitte la page
}

// ── Écouter le statut de l'ambulance ──
// INTÉGRATION dans pages/home.js :
//   useEffect(() => {
//     const unsub = ecouterStatutAmbulance("AMB-03", setStatut);
//     return unsub;
//   }, []);
export function ecouterStatutAmbulance(ambulanceId, callback) {
  const statusRef = ref(db, "ambulances/" + ambulanceId + "/status");
  return onValue(statusRef, (snapshot) => {
    callback(snapshot.exists() ? snapshot.val() : "deconnecte");
  });
}

// ── Écrire une alerte vers l'hôpital ──
// Appelé automatiquement quand un résultat arrive dans pages/result.js
export async function envoyerAlerteHopital(hopitalId, alerte) {
  const alerteRef = ref(db, "hopitaux/" + hopitalId + "/alertes/" + Date.now());
  await set(alerteRef, {
    groupe_sanguin: alerte.groupe_sanguin,
    ambulance_id: alerte.ambulance_id,
    timestamp: new Date().toISOString(),
    lu: false
  });
}
