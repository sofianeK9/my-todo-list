<script setup>
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div class="app">
    <h1>Vue Todo List</h1>
    <TodoList />
  </div>
</template>

<style scoped>
.app {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>
