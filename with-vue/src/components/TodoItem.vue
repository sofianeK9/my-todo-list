<template>
  <li :class="{ completed: todo.completed }">
    <input 
      type="checkbox" 
      :checked="todo.completed"
      @change="$emit('toggle')"
    >
    <span>{{ todo.text }}</span>
    <button @click="$emit('remove')" class="delete-btn">×</button>
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
li {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  margin-bottom: 8px;
  border-radius: 4px;
}

li.completed span {
  text-decoration: line-through;
  color: #888;
}

li span {
  flex: 1;
  margin: 0 10px;
}

.delete-btn {
  background-color: #ff4444;
  padding: 4px 8px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #cc0000;
}
</style>
