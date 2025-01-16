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

<style scoped>
/* Styles pour la navbar */
nav {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #333;
  color: white;
}

nav .logo a {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

nav .links {
  display: flex;
  align-items: center;
}

nav .links a {
  color: white;
  text-decoration: none;
  margin-left: 15px;
}

nav .links button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

nav .links button:hover {
  background-color: #ff3333;
}

.user-menu {
  display: flex;
  align-items: center;
}

.user-menu span {
  margin-right: 15px;
}
</style>
