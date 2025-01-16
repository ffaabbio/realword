import { defineStore } from "pinia";
import apiClient from "@/api/api";

export const useArticlesStore = defineStore("articles", {
  actions: {
    async addFavorite(slug: string) {
      //const response = await apiClient.post(`/articles/${slug}/favorite`);
      // Update article state if needed
    },
  },
});
