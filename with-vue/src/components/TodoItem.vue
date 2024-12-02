<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <input 
      class="todo-item-checkbox"
      type="checkbox" 
      :checked="todo.completed"
      @change="$emit('toggle')"
    >
    <span class="todo-item-text">{{ todo.text }}</span>
    <button @click="$emit('remove')" class="todo-item-delete">×</button>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  border-radius: 4px;
}

.todo-item.completed span {
  text-decoration: line-through;
  color: #35495e;
}

.todo-item-text {
  flex: 1;
  margin: 0 10px;
}

.todo-item-delete {
  background-color: #35495e;
  padding: 4px 8px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.todo-item-delete:hover {
  background-color: #2c3e50;
}
</style>
