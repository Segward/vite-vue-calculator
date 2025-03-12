<template>
  <Navigator />
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <h2>Enter your username</h2>
        <input type="text" id="username" />
      </div>
      <div>
        <h2>Enter your password</h2>
        <input type="password" id="password" />
      </div>
      <button type="submit" @click="submitForm">Submit</button>
    </form>
  </div>
</template>

<script setup>
import Navigator from "./Navigator.vue";

import { storeToken, getAuth } from "../Backend";

const submitForm = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const jwtToken = await getAuth(username, password);
  storeToken(jwtToken);
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  width: 300px;
  height: 30px;
  margin-bottom: 10px;
}

textarea {
  width: 300px;
  height: 100px;
  margin-bottom: 10px;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}
</style>
