<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <h2>Enter your name</h2>
        <input type="text" id="name" />
      </div>
      <div>
        <h2>Enter your email</h2>
        <input type="email" id="email" />
      </div>
      <div>
        <h2>Enter your message</h2>
        <textarea id="message"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup></script>

<style scoped>
.contact {
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
</style>
