import axios from "axios";

// 1. Priorité à la variable d'environnement, fallback sur le port local
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:true,
});

// 2. Intercepteur de REQUÊTE : Ajout du token
api.interceptors.request.use((config) => {
  // Vérification de 'window' pour éviter les crashs au build (Server-Side Rendering)
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// 3. Intercepteur de RÉPONSE : Gestion centralisée des erreurs
api.interceptors.response.use(
  (response) => response, // Succès : on retourne la réponse telle quelle
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      // Cas : Token expiré ou invalide
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        // Optionnel : window.location.href = '/login'; 
      }
      console.warn("Session expirée.");
    } else if (status === 500) {
      console.error("Erreur serveur (500).");
    }

    // On rejette l'erreur pour pouvoir la catcher dans les composants si besoin
    return Promise.reject(error);
  }
);

