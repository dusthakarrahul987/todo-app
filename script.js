const taskInput = document.getElementById("taskinput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(function(task){

    createTask(task);

});

function createTask(task){

    const li = document.createElement("li");

    li.textContent = task;

    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "delete";

    li.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function(){

        li.remove();

        tasks = tasks.filter(function(t){

            return t !== task;

        });

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

    li.addEventListener("click", function(){

        if(li.style.textDecoration === "line-through"){

            li.style.textDecoration = "none";

        }else{

            li.style.textDecoration = "line-through";

        }

    });

    const editBtn = document.createElement("button");

    editBtn.textContent = "edit";

    li.appendChild(editBtn);

    editBtn.addEventListener("click", function(event){

        event.stopPropagation();

        const updatedTask = prompt("Enter your Task");

        li.firstChild.textContent = updatedTask;

        const index = tasks.indexOf(task);

        tasks[index] = updatedTask;

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

    taskList.append(li);

}

addBtn.addEventListener("click", function(){

    if(taskInput.value === ""){

        return;

    }

    tasks.push(taskInput.value);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(taskInput.value);

    taskInput.value = "";

});

