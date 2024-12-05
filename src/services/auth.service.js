import apiClient from "./api"; // Fichier api.js pour les requêtes HTTP

const apiUrl = "http://127.0.0.1:8000/Garage/login/"; // URL de ton backend

// Fonction pour se connecter
export const login = async (credentials) => {
  try {
    const response = await apiClient.post(apiUrl, credentials);
    const { access_token, refresh_token, role } = response.data;

    // Sauvegarde les tokens et le rôle dans localStorage
    saveToken(access_token, refresh_token, role);

    return response.data; // Retourne les données reçues du backend
  } catch (error) {
    throw new Error("Échec de la connexion : " + error.response?.data?.message || error.message);
  }
};

// Fonction pour sauvegarder les tokens et le rôle
export const saveToken = (access_token, refresh_token, role) => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("role", role);
};

// Fonction pour récupérer le rôle de l'utilisateur
export const getRole = () => {
  return localStorage.getItem("role");
};

// Fonction pour récupérer le token d'accès
export const getToken = () => {
  return localStorage.getItem("access_token");
};

// Fonction pour se déconnecter
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("role");
};
