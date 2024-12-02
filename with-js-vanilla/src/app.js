import './components/todo-list.js';

export default class App {
    constructor(root) {
        this.root = root;
        this.root.attachShadow({ mode: 'open' })
        this.render();
    }

    render() {
        this.root.innerHTML = `
            <h2 class="app-title">Todo List</h2>
            <div id="todo-list-container"></div>
        `;
        
        const todoListContainer = this.root.querySelector('#todo-list-container');
        new TodoList(todoListContainer);
    }
}