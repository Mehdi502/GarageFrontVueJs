import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // URL de base du backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter un intercepteur pour inclure les tokens (si nécessaire)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
