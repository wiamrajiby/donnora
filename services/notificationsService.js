// services/notificationsService.js
// Personne 4 — Notifications FCM vers l'hôpital
// Utilisé dans : pages/home.js (bouton "Alerter l'hôpital")

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ── POST /notifications/hopital — Envoyer une alerte push FCM ──
// Appelé depuis le bouton "Alerter l'hôpital" dans pages/home.js
export async function alerterHopital(data) {
  try {
    const res = await fetch(`${API_URL}/notifications/hopital`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        groupe_sanguin: data.groupe_sanguin,
        ambulance_id: data.ambulance_id,
        confiance: data.confiance,
        eta: data.eta || "10 min",
        nb_donneurs: data.nb_donneurs || 0,
        hopital_id: data.hopital_id || "casablanca"
      })
    });
    if (!res.ok) throw new Error("Erreur lors de l'envoi de la notification");
    const result = await res.json();
    return { succes: true, messageId: result.messageId };
  } catch (error) {
    console.error("[notificationsService] alerterHopital :", error.message);
    return { succes: false, erreur: error.message };
  }
}
