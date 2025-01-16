<template>
  <div>
    <h1>{{ article.title }}</h1>
    <p>{{ article.content }}</p>
    <button @click="addFavorite(article.slug)">Add to Favorites</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useArticlesStore } from "@/stores/articles";

export default defineComponent({
  setup() {
    const articlesStore = useArticlesStore();
    const article = ref({
      title: "Sample Article",
      content: "Content here",
      slug: "sample-article",
    });

    const addFavorite = (slug: string) => {
      articlesStore.addFavorite(slug);
    };

    return {
      article,
      addFavorite,
    };
  },
});
</script>
