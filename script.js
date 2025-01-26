document.addEventListener("DOMContentLoaded", () => { 
    const search = document.querySelector(".search"); 
    const add = document.querySelector(".add"); 
    const todolist = document.getElementById("to-do-list"); 
    const universe = document.querySelector(".universe"); // Ensure you have a .universe div in your HTML
    
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let count = 0;  // To keep track of the number of completed tasks

    // Render existing tasks
    tasks.forEach(task => {
        renderTasks(task); 
        if (task.complete) count++;  // Update completed task count
    });

    // Event listener for adding a task
    add.addEventListener("click", () => { 
        const tasktext = search.value.trim(); 
        if (tasktext === "") return;

        const newTask = { 
            id: Date.now(), 
            text: tasktext, 
            complete: false, 
        }; 
        
        tasks.push(newTask); 
        saveTasks(); 
        renderTasks(newTask); 

        search.value = ""; 
        console.log(tasks); 
    }); 

    // Save tasks to localStorage
    function saveTasks() { 
        localStorage.setItem("tasks", JSON.stringify(tasks)); 
        updateTaskCompleteMessage(); // Update task completion message after saving
    } 

    // Render tasks on the UI
    function renderTasks(task) { 
        const li = document.createElement("li"); 
        li.classList.add("tasks");

        li.innerHTML = ` 
            <div class="task-content"> 
                <span>${task.text}</span> 
                <button class="Delete" data-id="${task.id}">Delete</button> 
            </div> 
        `;

        // Toggle task completion
        li.addEventListener("click", (event) => { 
            if (event.target.tagName === "BUTTON") return; 
            task.complete = !task.complete; 
            if (task.complete) count++;  // Increase count if task is completed
            else count--;  // Decrease count if task is unmarked

            li.classList.toggle('completed'); 
            saveTasks(); 
        }); 

        todolist.appendChild(li); 

        // Add delete functionality
        li.querySelector("button").addEventListener("click", () => { 
            tasks = tasks.filter(t => t.id !== task.id); 
            li.remove(); 
            saveTasks(); 
        });
    }

    // Update the task completion message
    function updateTaskCompleteMessage() {
        // Remove existing task complete message if there is one
        let existingMessage = universe.querySelector(".task-complete-message");
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create the new message
        const taskcomplete = document.createElement('div');
        taskcomplete.classList.add('task-complete-message'); // Add a class for styling (optional)

        const h3 = document.createElement('h3');
        h3.textContent = `Task Complete: ${count}/${tasks.length}`; // Show number of completed tasks out of total
        taskcomplete.appendChild(h3);

        // Append the message to the universe container
        universe.appendChild(taskcomplete);
    }

    // Initial call to display the task completion message
    updateTaskCompleteMessage(); // Display message on page load
});
