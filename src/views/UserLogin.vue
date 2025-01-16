<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  name: "UserLogin",
  setup() {
    const userStore = useUserStore();
    const email = ref("");
    const password = ref("");

    const submit = () => {
      userStore.login({ email: email.value, password: password.value });
    };

    return {
      email,
      password,
      submit,
    };
  },
});
</script>
