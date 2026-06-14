// services/donneursService.js
// Personne 4 — Connexion pages donneurs ↔ API NestJS (Personne 2)
// Utilisé dans : pages/donneurs.js, pages/donneurs/[id].js, pages/home.js

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ── GET /donneurs — Tous les donneurs ──
// Utilisé dans pages/donneurs.js pour remplacer les données fictives
export async function getTousDonneurs() {
  try {
    const res = await fetch(`${API_URL}/donneurs`);
    if (!res.ok) throw new Error("Erreur serveur : " + res.status);
    const data = await res.json();
    return { succes: true, donneurs: data };
  } catch (error) {
    console.error("[donneursService] getTousDonneurs :", error.message);
    return { succes: false, erreur: error.message, donneurs: [] };
  }
}

// ── GET /donneurs/:id — Un seul donneur ──
// Utilisé dans pages/donneurs/[id].js pour remplacer allDonneurs[id]
export async function getDonneurParId(id) {
  try {
    const res = await fetch(`${API_URL}/donneurs/${id}`);
    if (!res.ok) throw new Error("Donneur non trouvé");
    const data = await res.json();
    return { succes: true, donneur: data };
  } catch (error) {
    console.error("[donneursService] getDonneurParId :", error.message);
    return { succes: false, erreur: error.message, donneur: null };
  }
}

// ── GET /donneurs/compatibles/:groupe — Donneurs compatibles ──
// Utilisé dans pages/result.js pour afficher les donneurs compatibles avec le patient
// Exemple : getDonneursCompatibles("B-") → donneurs O- et B- disponibles
export async function getDonneursCompatibles(groupePatient) {
  try {
    const res = await fetch(`${API_URL}/donneurs/compatibles/${groupePatient}`);
    if (!res.ok) throw new Error("Erreur serveur : " + res.status);
    const data = await res.json();
    return { succes: true, donneurs: data };
  } catch (error) {
    console.error("[donneursService] getDonneursCompatibles :", error.message);
    return { succes: false, erreur: error.message, donneurs: [] };
  }
}

// ── POST /donneurs — Ajouter un nouveau donneur ──
// Utilisé dans la page /inscription-donneur (si elle existe)
export async function ajouterDonneur(donneurData) {
  try {
    const res = await fetch(`${API_URL}/donneurs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donneurData)
    });
    if (!res.ok) throw new Error("Erreur lors de l'ajout");
    const data = await res.json();
    return { succes: true, donneur: data };
  } catch (error) {
    console.error("[donneursService] ajouterDonneur :", error.message);
    return { succes: false, erreur: error.message };
  }
}

// ── PUT /donneurs/:id — Modifier la disponibilité ──
// Utilisé dans pages/donneurs/[id].js (bouton disponible/indisponible)
export async function modifierDonneur(id, data) {
  try {
    const res = await fetch(`${API_URL}/donneurs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Erreur lors de la modification");
    const result = await res.json();
    return { succes: true, resultat: result };
  } catch (error) {
    console.error("[donneursService] modifierDonneur :", error.message);
    return { succes: false, erreur: error.message };
  }
}
