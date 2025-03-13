<template>
  <Navigator />
  <div class="contact">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <h2>Enter your name</h2>
        <input type="text" id="name" v-model="name" @input="validateForm" />
      </div>
      <div>
        <h2>Enter your email</h2>
        <input type="email" id="email" v-model="email" @input="validateForm" />
      </div>
      <div>
        <h2>Enter your message</h2>
        <textarea
          id="message"
          v-model="message"
          @input="validateForm"
        ></textarea>
      </div>
      <button type="submit" :disabled="!submittable">Submit</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Navigator from "./Navigator.vue";
import { getToken, postContact, getValidate } from "../Backend";

const name = ref("");
const email = ref("");
const message = ref("");
const submittable = ref(false);
const errorMessage = ref("");

const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

const validateName = (name) => {
  return name.length > 0;
};

const validateMessage = (message) => {
  return message.length > 0;
};

const validateForm = () => {
  if (
    validateEmail(email.value) &&
    validateName(name.value) &&
    validateMessage(message.value)
  ) {
    submittable.value = true;
  } else {
    submittable.value = false;
  }
};

const submitForm = async () => {
  if (submittable.value) {
    try {
      const jwt = getToken();
      if (!jwt) {
        alert("You must be logged in to submit the form.");
        return;
      }
      const valid = await getValidate(jwt);
      if (!valid) {
        alert("Invalid token. Please log in again.");
        return;
      }
      const response = await postContact(
        jwt,
        name.value,
        email.value,
        message.value
      );
      if (response) {
        name.value = "";
        email.value = "";
        message.value = "";
        alert("Form submitted successfully!");
      } else {
        alert("There was an error submitting the form. 1");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("There was an error submitting the form. 2");
    }
  } else {
    alert("Please fill out the form correctly.");
  }
};
</script>

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

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
