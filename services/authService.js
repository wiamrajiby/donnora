// services/authService.js
// Personne 4 — Authentification Firebase
// Utilisé dans : pages/index.js (page Login de Personne 3)

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebase.config";

// ── Connexion avec email + mot de passe ──
// Appelé depuis le bouton "Se connecter" de la page Login
export async function connecter(email, motDePasse) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    return {
      succes: true,
      utilisateur: userCredential.user
    };
  } catch (error) {
    // Messages d'erreur en français
    let message = "Erreur de connexion.";
    if (error.code === "auth/user-not-found")    message = "Aucun compte trouvé avec cet email.";
    if (error.code === "auth/wrong-password")    message = "Mot de passe incorrect.";
    if (error.code === "auth/invalid-email")     message = "Adresse email invalide.";
    if (error.code === "auth/too-many-requests") message = "Trop de tentatives. Réessayez plus tard.";
    if (error.code === "auth/invalid-credential") message = "Email ou mot de passe incorrect.";
    return { succes: false, erreur: message };
  }
}

// ── Déconnexion ──
// Appelé depuis le bouton "Déconnexion" de pages/parametres.js
export async function deconnecter() {
  try {
    await signOut(auth);
    return { succes: true };
  } catch (error) {
    return { succes: false, erreur: error.message };
  }
}

// ── Écouter l'état de connexion en temps réel ──
// Utilisé dans _app.js ou dans chaque page pour protéger les routes
// Exemple : écouterAuth((user) => { if (!user) router.push("/"); })
export function ecouterAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

// ── Obtenir l'utilisateur connecté actuellement ──
export function utilisateurActuel() {
  return auth.currentUser;
}
