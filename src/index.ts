
interface Todo{
  text: string;
  completed: boolean;
}

document.addEventListener('DOMContentLoaded', () =>{
  const todoInput: HTMLInputElement = document.getElementById('todo-input') as HTMLInputElement;
  const submitBtn: HTMLButtonElement = document.getElementById('submit-btn') as HTMLButtonElement;
  const todoList: HTMLUListElement = document.getElementById('inputs') as HTMLUListElement;
  const itemsLeft: HTMLSpanElement = document.querySelector('.items-left') as HTMLSpanElement;
  const allBtn: HTMLDivElement = document.querySelector('.all') as HTMLDivElement;
  const activeBtn : HTMLDivElement = document.querySelector('.active') as HTMLDivElement;
  const completeBtn: HTMLDivElement = document.querySelector('.completed') as HTMLDivElement;
  const clearCompletedBtn: HTMLDivElement = document.querySelector('.clear-completed') as HTMLDivElement;





  //Load todos to the local storage
  let todos: Todo[] = JSON.parse(localStorage.getItem('todos')) || [];

  function updateItemsLeft(): void{
    const activeTodos:number = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = activeTodos.toString();
  }

  //Save todos to localStorage
  function saveToLocalStorage(): void{
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //Render todos based on the selected filter
  function renderTodos(filter: 'all' | 'active' | 'completed' = 'all'): void{
    todoList.innerHTML= '';
    const filteredTodos =todos.filter(todo =>{
      if(filter === 'all') return true;
      if(filter === 'active') return !todo.completed;
      if(filter === 'completed') return todo.completed;
    });

    filteredTodos.forEach((todo, index) =>{
      const li = document.createElement('li');
      li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
      <span contenteditable="true" class="${todo.completed ? 'completed' : ''}" data-index="${index}">${todo.text}</span>
      <button class="remove-btn" data-index="${index}">x</button>
      `;
      todoList.appendChild(li);
    })
  }
  // Add a new todo
  function addTodo(): void{
    const text = todoInput.value.trim();
    if(text){
      todos.push({text, completed: false});
      todoInput.value = '';
      saveToLocalStorage();
      renderTodos();
      updateItemsLeft();
    }
  }

  //Toggle completed status of a todo
  function toggleTodo(index: number): void{
    todos[index].completed = !todos[index].completed;
  }
})