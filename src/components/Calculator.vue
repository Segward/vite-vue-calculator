<template>
  <Navigator />
  <div class="calculator">
    <div class="display">{{ display }}</div>
    <div class="buttons">
      <button @click="clear()" class="btn">C</button>
      <button @click="ans()" class="btn">ANS</button>
      <button @click="del()" class="btn">DEL</button>
      <button @click="append('+')" class="btn-op">+</button>
      <button @click="append('1')" class="btn">1</button>
      <button @click="append('2')" class="btn">2</button>
      <button @click="append('3')" class="btn">3</button>
      <button @click="append('-')" class="btn-op">-</button>
      <button @click="append('4')" class="btn">4</button>
      <button @click="append('5')" class="btn">5</button>
      <button @click="append('6')" class="btn">6</button>
      <button @click="append('*')" class="btn-op">*</button>
      <button @click="append('7')" class="btn">7</button>
      <button @click="append('8')" class="btn">8</button>
      <button @click="append('9')" class="btn">9</button>
      <button @click="append('/')" class="btn-op">/</button>
      <button @click="append('0')" class="btn">0</button>
      <button @click="append('.')" class="btn">.</button>
      <button @click="calculate()" class="btn-op">=</button>
    </div>
    <div class="history">
      <h3>History</h3>
      <ul>
        <li v-for="item in history" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="history-form">
      <label for="historyCount">History Count</label>
      <input type="number" v-model.number="historyCount" min="10" />
      <button @click="fetchHistory()" class="btn-op">Fetch History</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Navigator from "./Navigator.vue";
import { getToken, getCalculate, getFetch, getValidate } from "../Backend";

const display = ref("0");
const history = ref([]);
const historyCount = ref(10); // Default value for history count
const pressedKeys = ref([]);
let previous = "";

const clear = () => {
  display.value = "0";
};

const ans = () => {
  append(previous);
};

const hasDoubleOperation = (value) => {
  let valueOp = false;
  let lastOp = false;
  let lastChar = display.value[display.value.length - 1];
  if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "."
  ) {
    valueOp = true;
  }
  if (
    lastChar === "+" ||
    lastChar === "-" ||
    lastChar === "*" ||
    lastChar === "/" ||
    lastChar === "."
  ) {
    lastOp = true;
  }
  if (valueOp && lastOp) {
    return true;
  } else {
    return false;
  }
};

const hasDoubleDot = (value) => {
  let segments = display.value.split(/[\+\-\*\/]/);
  let lastSegment = segments[segments.length - 1];
  let lastSegmentDot = lastSegment.includes(".");
  if (lastSegmentDot && value.includes(".")) {
    return true;
  } else {
    return false;
  }
};

const hasIllegalZeroLead = (value) => {
  let segments = display.value.split(/[\+\-\*\/]/);
  let lastSegment = segments[segments.length - 1];
  let isOp = false;
  if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "."
  ) {
    isOp = true;
  }
  if (
    lastSegment.startsWith("0") &&
    lastSegment.length === 1 &&
    segments.length > 1 &&
    isOp === false
  ) {
    return true;
  } else {
    return false;
  }
};

const isInvalid = (value) => {
  if (
    display.value === "Error" ||
    display.value === "." ||
    (display.value === "0" && value === "0")
  ) {
    return true;
  } else {
    return false;
  }
};

const append = (value) => {
  if (
    hasDoubleOperation(value) ||
    hasDoubleDot(value) ||
    hasIllegalZeroLead(value) ||
    isInvalid(value)
  ) {
    return;
  }
  if (display.value === "0" && value !== "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
};

const del = () => {
  if (display.value === "Error") {
    display.value = "0";
  } else if (display.value.length > 0) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }
  if (display.value === "") {
    display.value = "0";
  }
};

const calculate = async () => {
  if (display.value === "Error" || display.value.length === 1) return;
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
    const equation = display.value;
    const urlEquation = encodeURIComponent(equation);
    const answer = await getCalculate(jwt, urlEquation);
    display.value = answer;
    previous = answer;
  } catch (error) {
    console.error(error);
    display.value = "Error";
  }
};

const fetchHistory = async () => {
  try {
    const count = Math.max(historyCount.value, 10); // Ensure minimum of 10
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
    const historyData = await getFetch(jwtToken, count);
    history.value = historyData;
  } catch (error) {
    console.error(error);
  }
};

const keyPress = (event) => {
  const key = event.key;
  if (pressedKeys.value.includes(key)) {
    return;
  } else {
    pressedKeys.value.push(key);
  }
  event.preventDefault();
  if (key >= "0" && key <= "9") {
    append(key);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    append(key);
  } else if (key === ".") {
    append(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    del();
  }
};

const keyRelease = (event) => {
  const key = event.key;
  if (pressedKeys.value.includes(key)) {
    let index = pressedKeys.value.indexOf(key);
    pressedKeys.value.splice(index, 1);
  }
};

onMounted(() => {
  document.addEventListener("keydown", keyPress);
  document.addEventListener("keyup", keyRelease);
});

onUnmounted(() => {
  document.removeEventListener("keydown", keyPress);
  document.removeEventListener("keyup", keyRelease);
});
</script>

<style scoped>
.calculator {
  --primary-color: rgb(82, 82, 82);
  --secondary-color: rgb(254, 109, 56);
  --text-color: white;
  top: 35%;
  left: 50%;
  width: 300px;
  height: 300px;
  position: fixed;
  transform: translate(-50%, -50%);
  color: var(--text-color);
}

.display {
  font-size: 1.5em;
  text-align: left;
  width: 100%;
  height: 50px;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin-bottom: 20px;
  background-color: var(--primary-color);
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 1px;
  width: 100%;
  height: calc(100% - 4rem);
}

.history {
  margin-top: 20px;
  font-size: 1em;
  text-align: left;
  width: 100%;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;
  overflow-y: scroll;
  background-color: var(--primary-color);
  border-radius: 5px;
  padding-left: 1rem;
}

.history-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 100px;
  height: 30px;
  margin-bottom: 10px;
}

.btn {
  background-color: var(--primary-color);
  border-radius: 5px;
  color: var(--text-color);
}

.btn-op {
  background-color: var(--secondary-color);
  border-radius: 5px;
  color: var(--text-color);
}
</style>