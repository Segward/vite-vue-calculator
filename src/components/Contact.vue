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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import Navigator from "./Navigator.vue";

const store = useStore();
const name = ref(store.getters.getName);
const email = ref(store.getters.getEmail);
const message = ref(store.getters.getMessage);
const submittable = ref(false);

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
    const response = await store.dispatch("saveUserData", {
      name: name.value,
      email: email.value,
      message: message.value,
    });
    if (response && (response.status === 200 || response.status === 201)) {
      name.value = "";
      email.value = "";
      message.value = "";
      alert("Form submitted successfully!");
    } else {
      alert("There was an error submitting the form.");
    }
  } else {
    alert("Please fill out the form correctly.");
  }
};

onMounted(async () => {
  await store.dispatch("loadUserData");
});
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
</style>
