<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="submit">
      <input v-model="username" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUserStore } from "@/stores/user";

export default defineComponent({
  name: "UserSignup",
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const userStore = useUserStore();

    const submit = () => {
      userStore.signup({
        username: username.value,
        email: email.value,
        password: password.value,
      });
    };

    return { username, email, password, submit };
  },
});
</script>

<style src="../css/UserSignup.css"></style>
