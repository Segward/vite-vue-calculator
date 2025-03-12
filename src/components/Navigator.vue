<template>
  <div class="navigator">
    <a href="/"><button>Calculator</button></a>
    <a href="/contact"><button>Contact</button></a>
    <a href="/login"><button>Login</button></a>
  </div>
</template>

<script setup></script>

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
</style>
