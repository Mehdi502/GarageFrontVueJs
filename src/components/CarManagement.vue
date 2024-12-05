<template>
  <div class="car-management">
    <header class="header">
      <h2>Gestion des Voitures</h2>
      <button class="btn logout-btn" @click="logout">Déconnexion</button>
    </header>

    <!-- Liste des voitures -->
    <ul class="car-list">
      <li v-for="car in cars" :key="car.registration_number" class="car-item">
        <strong>{{ car.brand }} {{ car.model }}</strong>
        ({{ car.registration_number }}) - 
        <span class="status">{{ car.status }}</span>
        <button class="btn edit-btn" @click="selectCar(car)">Modifier</button>
        <button
          class="btn delete-btn"
          v-if="role === 'admin'"
          @click="deleteCar(car.registration_number)"
        >
          Supprimer
        </button>
      </li>
    </ul>

    <!-- Formulaire d'ajout ou de modification -->
    <div class="form-container">
      <h3>{{ editMode ? "Modifier Voiture" : "Ajouter une Voiture" }}</h3>

      <form @submit.prevent="editMode ? updateCar() : addCar()">
        <input
          class="form-input"
          type="text"
          v-model="registration_number"
          placeholder="Matricule"
          :readonly="role === 'employee'"
          required
        />
        <input
          class="form-input"
          type="text"
          v-model="brand"
          placeholder="Marque"
          :readonly="role === 'employee'"
          required
        />
        <input
          class="form-input"
          type="text"
          v-model="model"
          placeholder="Modèle"
          :readonly="role === 'employee'"
          required
        />
        <select class="form-select" v-model="status">
          <option value="in_progress">En cours</option>
          <option value="completed">Terminé</option>
          <option value="under_review">En révision</option>
        </select>
        <input
          v-if="role === 'admin'"
          class="form-input"
          type="text"
          v-model="assigned_employee"
          placeholder="Employé"
          required
        />
        <input
          v-if="role === 'admin'"
          class="form-input"
          type="text"
          v-model="client"
          placeholder="Client"
          required
        />
        <button class="btn primary-btn" type="submit">
          {{ editMode ? "Modifier" : "Ajouter" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import carService from "../services/car.service"; // Service des voitures
import { getRole } from "../services/auth.service"; // Service pour récupérer le rôle utilisateur

export default {
  name: "CarManagement",
  data() {
    return {
      cars: [], // Liste des voitures
      selectedCar: null, // Voiture sélectionnée pour modification
      editMode: false, // Mode édition ou ajout

      // Champs du formulaire
      registration_number: "",
      brand: "",
      model: "",
      status: "in_progress",
      assigned_employee: "",
      client: "",
      role: getRole(), // Récupération du rôle utilisateur
      errorMessage: "", // Message d'erreur pour affichage utilisateur
    };
  },
  methods: {
    // Récupérer la liste des voitures
    async fetchCars() {
      try {
        const data = await carService.getCars();
        this.cars = data;
        this.errorMessage = ""; // Efface le message d'erreur si les données sont récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures :", error);
        this.errorMessage =
          "Impossible de charger les voitures. Veuillez réessayer.";
      }
    },

    // Ajouter une voiture
    async addCar() {
      const carToAdd = {
        registration_number: this.registration_number,
        brand: this.brand,
        model: this.model,
        status: this.status,
        assigned_employee: this.assigned_employee,
        client: this.client,
      };
      try {
        await carService.addCar(carToAdd);
        this.fetchCars();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout de la voiture :", error);
        this.errorMessage =
          "Impossible d'ajouter la voiture. Veuillez réessayer.";
      }
    },

    // Modifier une voiture
    async updateCar() {
      const updatedCar = {
        registration_number: this.registration_number,
        brand: this.brand,
        model: this.model,
        status: this.status,
        assigned_employee: this.assigned_employee,
        client: this.client,
      };
      try {
        await carService.updateCar(
          this.selectedCar.registration_number,
          updatedCar
        );
        this.fetchCars();
        this.resetForm();
        this.editMode = false;
        this.selectedCar = null;
      } catch (error) {
        console.error("Erreur lors de la modification de la voiture :", error);
        this.errorMessage =
          "Impossible de modifier la voiture. Veuillez réessayer.";
      }
    },

    // Supprimer une voiture
    async deleteCar(registration) {
      try {
        await carService.deleteCar(registration);
        this.fetchCars();
      } catch (error) {
        console.error("Erreur lors de la suppression de la voiture :", error);
        this.errorMessage =
          "Impossible de supprimer la voiture. Veuillez réessayer.";
      }
    },

    // Sélectionner une voiture pour modification
    selectCar(car) {
      this.selectedCar = { ...car };
      this.registration_number = car.registration_number;
      this.brand = car.brand;
      this.model = car.model;
      this.status = car.status;
      this.assigned_employee = car.assigned_employee;
      this.client = car.client;
      this.editMode = true;
    },

    // Réinitialiser le formulaire
    resetForm() {
      this.registration_number = "";
      this.brand = "";
      this.model = "";
      this.status = "in_progress";
      this.assigned_employee = "";
      this.client = "";
      this.editMode = false;
    },

    // Déconnexion
    async logout() {
      try {
        localStorage.removeItem("accessToken"); // Suppression du token côté client
        this.$router.push("/login"); // Redirection vers la page de connexion
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
        this.errorMessage = "Impossible de se déconnecter. Veuillez réessayer.";
      }
    },
  },
  async mounted() {
    this.fetchCars();
  },
};
</script>

<style scoped>
.car-management {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.car-management h2 {
  color: #333;
  margin-bottom: 20px;
}

.car-list {
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
}

.car-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.car-item strong {
  margin-right: 10px;
}

.status {
  font-weight: bold;
  margin-right: 10px;
  color: #555;
}

.form-container {
  margin-top: 20px;
}

.form-input,
.form-select {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.primary-btn {
  background-color: #007bff;
  color: white;
}

.edit-btn {
  background-color: #28a745;
  color: white;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logout-btn {
  background-color: #dc3545;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #b02a37;
}
</style>
