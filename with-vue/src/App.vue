<script setup>
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <div class="app">
    <h1 class="app-title">Vue Todo List</h1>
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

.app-title {
  text-align: center;
  color: #35495e;
  margin-bottom: 30px;
}
</style>
