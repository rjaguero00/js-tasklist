//Define our ul variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load add event listeners 
function loadEventListeners() {
    //Add task events
    form.addEventListener('submit', addTask);
    //Remove Task
    taskList.addEventListener('click', deleteItem);
    //Clear all task from list
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks list
    filter.addEventListener('keyup', filterTasks);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    //Create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //Create textNode & append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add  icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);

    //Add Local Storage
    storeTask(taskInput.value);

    //Clear the Input
    taskInput.value = '';

    e.preventDefault();
}

//Function that deletes task
function deleteItem(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        console.log('delete item');
        e.target.parentElement.parentElement.remove();

        //Remove From Local Storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

function clearTasks(e) {
    //Two ways of doing this
    //1.
    //taskList.innerHTML = '';

    // 2. Faster way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    //Clear from local storage
    clearTaskFromLocalStorage();

}

//Clear task from Local Storage
function clearTaskFromLocalStorage() {
    localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });

}

//Store Task
function storeTask(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Get tasks from Local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create textNode & append to li
        li.appendChild(document.createTextNode(task));
        //Create a new link element
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add  icon HTML
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}