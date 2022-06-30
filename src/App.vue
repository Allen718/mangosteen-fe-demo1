<script setup lang="ts">
import { ref } from "vue";
const refCount = ref(0);
const onClick = () => {
  refCount.value += 1;
};
</script>

<template>
  <div>{{ refCount }}</div>
  <button @click="onClick">+1</button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
