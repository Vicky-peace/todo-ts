
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
    saveToLocalStorage();
    renderTodos();
    updateItemsLeft();
  }

  //Edit the text of a todo
  function editTodo(index: number, newText: string): void{
    todos[index].text = newText;
    saveToLocalStorage();
  }

  //Remove a todo
  function removeTodo(index: number): void{
    todos.splice(index, 1);
    saveToLocalStorage();
    renderTodos();
    updateItemsLeft();
  }

  //Clear all completed todos
  function clearCompletedTodos():void{
    todos= todos.filter(todo => !todo.completed);
    saveToLocalStorage();
    renderTodos();
    updateItemsLeft();
  }

 //Add event listeners
 submitBtn.addEventListener('click', addTodo);
 
 todoList.addEventListener('click', (e) =>{
  const target = e.target as HTMLElement;
  const index = Number(target.getAttribute('data-index'));
  if(target.matches('input[type = "checkbox"]')){
    toggleTodo(index);
  }else if(target.matches('.remove-btn')){
    removeTodo(index)
  }
 });

 todoList.addEventListener('input', (e) =>{
  const target = e.target as HTMLElement;
  const index = Number(target.getAttribute('data-index'));
  if(target.matches('span')){
    editTodo(index, target.textContent || '');
  }
 });

 allBtn.addEventListener('click', () => renderTodos('all'));
 activeBtn.addEventListener('click', () => renderTodos('active'));
 completeBtn.addEventListener('click', () => renderTodos('completed'));
 clearCompletedBtn.addEventListener('click', clearCompletedTodos);

 //Initial render
 renderTodos();
 updateItemsLeft();
})