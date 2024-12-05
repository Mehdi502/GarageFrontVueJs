import apiClient from "./api"; // Le fichier api.js configuré avec Axios

const apiUrl = "http://localhost:8000/Garage/cars/"; // URL de base de l'API

export default {
  // Récupérer la liste des voitures
  getCars() {
    return apiClient.get(apiUrl).then((response) => response.data);
  },

  // Ajouter une voiture
  addCar(car) {
    return apiClient.post(`${apiUrl}add/`, car);
  },

  // Mettre à jour une voiture
  updateCar(registrationNumber, car) {
    return apiClient.put(`${apiUrl}${registrationNumber}/update/`, car);
  },

  // Supprimer une voiture
  deleteCar(registrationNumber) {
    return apiClient.delete(`${apiUrl}${registrationNumber}/delete/`);
  },
};
