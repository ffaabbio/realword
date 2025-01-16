<template>
  <nav>
    <div class="logo">
      <router-link to="/">Mon Blog</router-link>
    </div>
    <div class="links">
      <router-link to="/articles">Articles</router-link>
      <router-link v-if="!userStore.user" to="/login">Se connecter</router-link>
      <router-link v-if="!userStore.user" to="/signup">S'inscrire</router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "AppNavbar",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    // Fonction pour se déconnecter

    console.log("Utilisateur dans AppNavbar", userStore.user);

    const logout = () => {
      userStore.logout();
      router.push("/login"); // Rediriger vers la page de login après la déconnexion
    };

    return {
      userStore,
      logout,
    };
  },
});
</script>

<style src="../css/AppNavbar.css"></style>
