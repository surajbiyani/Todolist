document.addEventListener('DOMContentLoaded',() => {
    const todoInput = document.getElementById("todoInput")
const addtaskBtnn = document.getElementById("addtaskBtn")
const todoList = document.getElementById("todoList")

let tasks= JSON.parse(localStorage.getItem('tasks'))||[];
tasks.forEach(task => renderTask(task));

addtaskBtnn.addEventListener("click" , () => {
   const taskText= todoInput.value.trim();
   if(taskText=== "") return ;
    
   const newTask = {
    id: Date.now(),
    text: taskText,
    completed : false,
};
tasks.push(newTask)
saveTasks();
renderTask(newTask);
todoInput.value= ""; //clear the action
console.log(tasks);
});

function renderTask(task)
{
console.log(task);
const li = document.createElement("li");
li.setAttribute("data-id", task.id);
if(task.completed) li.classList.add("completed");
li.innerHTML = `
<span>${task.text}</span> 
<button> Delete </button>
`;
li.addEventListener("click", (e) => {
    if(e.target.tagName === 'BUTTON') return;
    task.completed = !task.completed;
    li.classList.toogle("completed");
    saveTasks();
});
li.querySelector('button').addEventListener("click", (e) => {
    e.stopPropagation(); // prevent toogle from firing
    tasks = tasks.filter(t => t.id !== task.id)
    li.remove();
    saveTasks();

})
todoList.appendChild(li);
}

function saveTasks(){
    localStorage.setItem('tasks' , JSON.stringify(tasks))
}
})