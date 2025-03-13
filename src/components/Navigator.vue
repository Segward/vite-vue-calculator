<template>
  <div class="navigator">
    <div v-if="username" class="username-display">{{ username }}</div>
    <a href="/"><button>Calculator</button></a>
    <a href="/contact"><button>Contact</button></a>
    <a href="/login"><button>Login</button></a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUsername } from "../Backend";

const username = ref("");

onMounted(() => {
  username.value = getUsername();
});
</script>

<style>
.navigator {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  background-color: aquamarine;
  padding: 20px;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: black;
  font-size: 1.5em;
}

button {
  width: 100px;
  height: 50px;
}

.username-display {
  font-size: 3em;
  color: purple;
  padding: 5px;
}
</style>
