import { defineStore } from "pinia";
import apiClient from "@/api/api"; // Importation par défaut

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as any,
    token: null as string | null,
  }),

  actions: {
    async login(credentials: { email: string; password: string }) {
      try {
        const response = await apiClient.post("/users/login", credentials);
        this.user = response.data.user;
        this.token = response.data.user.token;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Token ${this.token}`;
      } catch (error) {
        console.error("Erreur lors de la connexion:", error);
      }
    },

    async signup(credentials: {
      username: string;
      email: string;
      password: string;
    }) {
      try {
        const response = await apiClient.post("/users", { user: credentials });
        this.user = response.data.user;
        this.token = response.data.user.token;
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Token ${this.token}`;
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      apiClient.defaults.headers.common["Authorization"] = "";
    },
  },
});
