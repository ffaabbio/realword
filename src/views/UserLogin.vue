<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" :disabled="loading">Login</button>
    </form>

    <!-- Indicateur de chargement -->
    <div v-if="loading">Connexion en cours...</div>

    <!-- Message d'erreur -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- Message de succès -->
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router"; // Importer le router pour la redirection

export default defineComponent({
  name: "UserLogin",
  setup() {
    const email = ref("");
    const password = ref("");
    const userStore = useUserStore();
    const router = useRouter(); // Pour la redirection après connexion
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const submit = async () => {
      errorMessage.value = ""; // Réinitialiser le message d'erreur
      successMessage.value = ""; // Réinitialiser le message de succès
      loading.value = true; // Début du chargement

      try {
        await userStore.login({
          email: email.value,
          password: password.value,
        });

        // Si la connexion est réussie
        successMessage.value = "Connexion réussie ! Redirection en cours...";
        setTimeout(() => {
          router.push("/"); // Rediriger vers la page d'accueil après la connexion réussie
        }, 2000);
      } catch (error: any) {
        // Si la connexion échoue
        errorMessage.value =
          error.response?.data?.message ||
          "Une erreur s'est produite lors de la connexion.";
      } finally {
        loading.value = false; // Fin du chargement
      }
    };

    return {
      email,
      password,
      submit,
      loading,
      errorMessage,
      successMessage,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
