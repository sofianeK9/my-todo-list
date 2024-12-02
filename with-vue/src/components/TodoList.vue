<template>
  <div class="todo-list">
    <div class="add-todo">
      <input 
        :value="newTodo"
        @input="newTodo = $event.target.value"
        @keyup.enter="addTodo"
        type="text" 
        placeholder="Add a new todo..."
      >
      <button @click="addTodo">Add</button>
    </div>
    
    <ul class="todos" v-if="todos.length">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo(todo)"
        @remove="removeTodo(todo)"
      />
    </ul>
    <p v-else class="empty-state">
      No todos yet! Add one to get started.
    </p>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import TodoItem from './TodoItem.vue'

const STORAGE_KEY = 'vue-todo-list'

const newTodo = ref('')
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'))

// Save todos to localStorage whenever they change
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
})

const addTodo = () => {
  if (!newTodo.value.trim()) return
  
  todos.value.push({
    id: Date.now(),
    text: newTodo.value.trim(),
    completed: false
  })
  newTodo.value = ''
}

const toggleTodo = (todo) => {
  todo.completed = !todo.completed
}

const removeTodo = (todoToRemove) => {
  todos.value = todos.value.filter(todo => todo !== todoToRemove)
}
</script>

<style scoped>
.todo-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.todos {
  list-style: none;
  padding: 0;
}

.empty-state {
  text-align: center;
  color: #666;
  font-style: italic;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-top: 20px;
}
</style>
