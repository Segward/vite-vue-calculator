<template>
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
  </div>
</template>

<script setup>
import { ref } from "vue";

const display = ref("0");
const history = ref([]);
let previous = "";

const clear = () => {
  display.value = "0";
};

const ans = () => {
  display.value += previous;
};

const append = (value) => {
  if (
    display.value === "Infinity" ||
    display.value === "-Infinity" ||
    display.value === "Error" ||
    display.value === "." ||
    (display.value === "0" && value === "0")
  ) {
    return;
  } else if (display.value === "0" && value !== "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
};

const del = () => {
  if (
    display.value === "Infinity" ||
    display.value === "-Infinity" ||
    display.value === "Error"
  ) {
    display.value = "0";
  } else if (display.value.length > 0) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }
};

const calculate = () => {
  if (
    display.value === "Infinity" ||
    display.value === "-Infinity" ||
    display.value === "Error"
  )
    return;
  try {
    let equation = display.value;
    let answer = eval(equation).toString();
    let historyItem = `${equation} = ${answer}`;
    history.value.push(historyItem);
    display.value = answer;
    previous = answer;
  } catch (error) {
    console.error(error);
    display.value = "Error";
  }
};
</script>

<style scoped>
.calculator {
  top: 35%;
  left: 50%;
  width: 300px;
  height: 300px;
  position: fixed;
  transform: translate(-50%, -50%);
  color: white;
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
  background-color: rgb(82, 82, 82);
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
  background-color: rgb(82, 82, 82);
  border-radius: 5px;
  padding-left: 1rem;
}

.btn {
  background-color: rgb(82, 82, 82);
  border-radius: 5px;
  color: white;
}

.btn-op {
  background-color: rgb(255, 116, 66);
  border-radius: 5px;
  color: white;
}
</style>
