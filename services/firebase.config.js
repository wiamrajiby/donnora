// services/firebase.config.js
// Personne 4 — Initialisation Firebase
// Ce fichier est importé par TOUS les autres services

import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBqUaX1ym4VrHlmIg22OnPOBoMi_iPCiO0",
  authDomain: "robot-sang-injaz-4d80e.firebaseapp.com",
  databaseURL: "https://robot-sang-injaz-4d80e-default-rtdb.firebaseio.com",
  projectId: "robot-sang-injaz-4d80e",
  storageBucket: "robot-sang-injaz-4d80e.firebasestorage.app",
  messagingSenderId: "532950997170",
  appId: "1:532950997170:web:a381e91a94ea61578c51ab",
  measurementId: "G-SKTR5JHVSW"
};

// Initialiser Firebase une seule fois (évite les erreurs Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);         // Firestore (donneurs, résultats)
export const realtimeDb = getDatabase(app);  // Realtime DB (robot → hôpital)

// Messaging (FCM) — disponible seulement côté navigateur
export const getMessagingInstance = async () => {
  const supported = await isSupported();
  if (supported) {
    return getMessaging(app);
  }
  return null;
};

export default app;
