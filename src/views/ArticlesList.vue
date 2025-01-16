<template>
  <div>
    <h1>Articles</h1>
    <div v-if="loading">Chargement des articles...</div>
    <div v-if="error" class="error">
      Erreur lors du chargement des articles : {{ error }}
    </div>
    <div v-if="articles.length === 0 && !loading">
      <p>Aucun article trouvé.</p>
    </div>

    <div v-for="article in articles" :key="article.slug" class="article-item">
      <h2>{{ article.title }}</h2>
      <p>{{ article.description }}</p>
      <router-link :to="`/articles/${article.slug}`">Lire plus</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user"; // Utilisation de Pinia pour l'état utilisateur

export default defineComponent({
  name: "ArticlesList",
  setup() {
    const articles = ref<any[]>([]); // Liste des articles
    const loading = ref<boolean>(false); // Indicateur de chargement
    const error = ref<string | null>(null); // Erreur lors de la récupération des articles

    // Fonction pour charger les articles depuis l'API
    const fetchArticles = async () => {
      loading.value = true;
      error.value = null; // Réinitialiser l'erreur

      try {
        const response = await axios.get(
          "https://realword-api.nouwillcode.com/api/articles"
        ); // Requête GET pour récupérer les articles
        articles.value = response.data.articles; // Stocker les articles dans l'état
      } catch (err) {
        error.value = "Impossible de récupérer les articles."; // Gestion des erreurs
      } finally {
        loading.value = false; // Fin du chargement
      }
    };

    // Charger les articles au montage du composant
    onMounted(() => {
      fetchArticles();
    });

    return {
      articles,
      loading,
      error,
    };
  },
});
</script>

<style scoped>
.article-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.error {
  color: red;
  font-weight: bold;
}
</style>

<style src="../css/ArticleList.css"></style>
