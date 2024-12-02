import './style.css'
import './todo-item.js'

class TodoList extends HTMLElement {
  constructor() {
    super()
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    this.attachShadow({ mode: 'open' })
    this.render()
    this.addEventListeners()
  }

  connectedCallback() {
    this.render()
  }

  get template() {
    return `
      <style>
        :host {
          display: block;
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          max-width: 600px;
          margin: 0 auto;
          padding: 2rem;
        }

        .container {
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }

        h1 {
          color: #3498db;
          font-size: 2.5rem;
          margin: 0 0 2rem;
          text-align: center;
        }

        form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
        }

        input {
          flex: 1;
          padding: 0.8rem;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.3s;
        }

        input:focus {
          border-color: #3498db;
        }

        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s;
        }

        button:hover {
          background: #2980b9;
        }

        @media (max-width: 480px) {
          :host {
            padding: 1rem;
          }

          .container {
            padding: 1rem;
          }
        }
      </style>
      <div class="container">
        <h1>Todo List</h1>
        <form id="todo-form">
          <input 
            id="todo-input" 
            type="text" 
            placeholder="What needs to be done?"
            required
          >
          <button type="submit">Add</button>
        </form>
        <div id="todo-list"></div>
      </div>
    `
  }

  render() {
    this.shadowRoot.innerHTML = this.template
    this.renderTodos()
  }

  renderTodos() {
    const todoList = this.shadowRoot.getElementById('todo-list')
    if (!todoList) return

    todoList.innerHTML = ''
    this.todos.forEach(todo => {
      const todoItem = document.createElement('todo-item')
      todoItem.setAttribute('text', todo.text)
      if (todo.completed) {
        todoItem.setAttribute('completed', '')
      }
      todoItem.dataset.id = todo.id
      todoList.appendChild(todoItem)
    })
  }

  addEventListeners() {
    this.shadowRoot.addEventListener('submit', (e) => {
      if (e.target.id === 'todo-form') {
        e.preventDefault()
        this.addTodo()
      }
    })

    this.shadowRoot.addEventListener('toggleTodo', (e) => {
      const todoItem = e.target
      const todoId = todoItem.dataset.id
      this.toggleTodo(todoId)
    })

    this.shadowRoot.addEventListener('deleteTodo', (e) => {
      const todoItem = e.target
      const todoId = todoItem.dataset.id
      this.deleteTodo(todoId)
    })
  }

  addTodo() {
    const input = this.shadowRoot.getElementById('todo-input')
    const text = input.value.trim()
    if (!text) return

    const todo = {
      id: Date.now().toString(),
      text,
      completed: false
    }

    this.todos.push(todo)
    input.value = ''
    this.saveTodos()
    this.renderTodos()
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
    this.saveTodos()
    this.renderTodos()
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    this.saveTodos()
    this.renderTodos()
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}

customElements.define('todo-list', TodoList)