<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header">
        <h2>Login</h2>
      </div>
      <div class="card-body">
        <form @submit.prevent="onLogin" class="form-container">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="form-input"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="form-input"
            />
          </div>

          <button type="submit" class="button primary-btn">Login</button>
        </form>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "../services/auth.service";

export default {
  name: "LoginPage",
  data() {
    return {
      credentials: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async onLogin() {
      try {
        // Appeler le service login
        const { role } = await login(this.credentials);

        // Redirection basée sur le rôle
        if (role === "admin") {
          this.$router.push("/car");
        } else if (role === "employee") {
          this.$router.push("/car");
        } else if (role === "client") {
          this.$router.push("/client");
        }
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
  },
};
</script>


<style scoped>
.login-container {
  width: 350px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: linear-gradient(145deg, #ffffff, #f3f3f3);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: "Poppins", sans-serif;
}

.login-container h2 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #333;
}

.error {
  color: #e53935;
  margin-top: 15px;
  font-size: 0.9rem;
  font-weight: bold;
}

.login-container input {
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
}

.login-container button {
  width: 100%;
  padding: 10px 15px;
  margin-top: 15px;
  border: none;
  border-radius: 5px;
  background: #4caf50;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-container button:hover {
  background: #388e3c;
}
</style>
