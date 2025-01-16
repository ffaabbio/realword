<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="submit">
      <input v-model="username" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit" :disabled="loading">Signup</button>
    </form>

    <!-- Indicateur de chargement -->
    <div v-if="loading">Enregistrement en cours...</div>

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
  name: "UserSignup",
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const userStore = useUserStore();
    const router = useRouter(); // Pour la redirection après inscription
    const loading = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");

    const submit = async () => {
      errorMessage.value = ""; // Réinitialiser le message d'erreur
      successMessage.value = ""; // Réinitialiser le message de succès
      loading.value = true; // Début du chargement

      try {
        await userStore.signup({
          username: username.value,
          email: email.value,
          password: password.value,
        });

        // Si l'inscription est réussie
        successMessage.value =
          "Inscription réussie ! Vous pouvez maintenant vous connecter.";
        setTimeout(() => {
          router.push("/login"); // Rediriger vers la page de login après 2 secondes
        }, 2000);
      } catch (error: any) {
        // Si l'inscription échoue
        errorMessage.value =
          error.response?.data?.message ||
          "Une erreur s'est produite lors de l'inscription.";
      } finally {
        loading.value = false; // Fin du chargement
      }
    };

    return {
      username,
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

<style src="../css/UserSignup.css"></style>
