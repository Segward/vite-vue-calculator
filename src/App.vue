<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  const router = useRouter();
  console.log("Current route:", router.currentRoute.value);
});
</script>

<style>
html {
  font-family: "Times New Roman", Times, serif;
  background-color:indianred;
}
</style>
