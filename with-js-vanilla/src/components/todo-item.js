export class TodoItem extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['text', 'completed']
  }

  get template() {
    const completed = this.hasAttribute('completed')
    return `
      <style>
        :host {
          display: block;
          margin-bottom: 0.5rem;
        }

        .todo-item {
          display: flex;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e0e0e0;
          border-radius: 5px;
          gap: 1rem;
          transition: transform 0.2s, box-shadow 0.2s;
          background: white;
        }

        .todo-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .todo-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .todo-text {
          flex: 1;
          font-size: 1rem;
          font-family: inherit;
          ${completed ? 'text-decoration: line-through; color: #95a5a6;' : ''}
        }

        .delete-btn {
          background: transparent;
          color: #e74c3c;
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1.2rem;
          opacity: 0.7;
          transition: all 0.3s;
        }

        .delete-btn:hover {
          background: #e74c3c;
          color: white;
          opacity: 1;
        }
      </style>
      <div class="todo-item">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${completed ? 'checked' : ''}
        >
        <span class="todo-text">${this.getAttribute('text')}</span>
        <button class="delete-btn">×</button>
      </div>
    `
  }

  connectedCallback() {
    this.render()
    this.addEventListeners()
  }

  attributeChangedCallback() {
    if (this.isConnected) {
      this.render()
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.template
  }

  addEventListeners() {
    const checkbox = this.shadowRoot.querySelector('.todo-checkbox')
    const deleteBtn = this.shadowRoot.querySelector('.delete-btn')

    checkbox.addEventListener('change', () => {
      this.dispatchEvent(new CustomEvent('toggleTodo', {
        bubbles: true,
        composed: true
      }))
    })

    deleteBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('deleteTodo', {
        bubbles: true,
        composed: true
      }))
    })
  }
}

customElements.define('todo-item', TodoItem)
