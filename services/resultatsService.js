// services/resultatsService.js
// Personne 4 — Connexion pages résultats/historique ↔ API NestJS (Personne 2)
// Utilisé dans : pages/result.js, pages/historique.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ── POST /resultats — Enregistrer un résultat de détection ──
// Appelé après réception du résultat Firebase dans pages/result.js
// Déclenche aussi la notification FCM vers l'hôpital (géré par Personne 2)
export async function enregistrerResultat(data) {
  try {
    const res = await fetch(`${API_URL}/resultats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patient_id: data.patient_id,
        groupe_sanguin_detecte: data.groupe,
        confiance: data.confiance,
        ambulance_id: data.ambulance_id,
        hopital: data.hopital
      })
    });
    if (!res.ok) throw new Error("Erreur lors de l'enregistrement");
    const result = await res.json();
    return { succes: true, resultat: result };
  } catch (error) {
    console.error("[resultatsService] enregistrerResultat :", error.message);
    return { succes: false, erreur: error.message };
  }
}

// ── GET /resultats — Historique des détections ──
// Utilisé dans pages/historique.js pour remplacer les données fictives
export async function getHistorique() {
  try {
    const res = await fetch(`${API_URL}/resultats`);
    if (!res.ok) throw new Error("Erreur serveur : " + res.status);
    const data = await res.json();
    return { succes: true, resultats: data };
  } catch (error) {
    console.error("[resultatsService] getHistorique :", error.message);
    return { succes: false, erreur: error.message, resultats: [] };
  }
}

// ── GET /resultats/:id — Détail d'un résultat ──
// Utilisé dans pages/result.js pour charger un résultat précis
export async function getResultatParId(id) {
  try {
    const res = await fetch(`${API_URL}/resultats/${id}`);
    if (!res.ok) throw new Error("Résultat non trouvé");
    const data = await res.json();
    return { succes: true, resultat: data };
  } catch (error) {
    console.error("[resultatsService] getResultatParId :", error.message);
    return { succes: false, erreur: error.message, resultat: null };
  }
}
