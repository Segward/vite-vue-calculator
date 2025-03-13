<template>
  <div class="navigator">
    <div v-if="token" class="token-display">{{ token }}</div>
    <a href="/"><button>Calculator</button></a>
    <a href="/contact"><button>Contact</button></a>
    <a href="/login"><button>Login</button></a>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "../Backend";

const token = ref("");

onMounted(() => {
  if (getToken()) {
    token.value = getToken();
  }
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

.token-display {
  position: relative;
  font-size: 1em;
  color: black;
  padding: 5px;
  border-radius: 5px;
  max-width: 1000px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
