// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");


// Add task function
function addTask() {

    // Get input value
    const taskText = taskInput.value.trim();

    // Check empty input
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }


    // Create list item
    const li = document.createElement("li");

    li.className = "task-item";


    // Create left section
    const leftSection = document.createElement("div");

    leftSection.className = "task-left";


    // Create checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className = "task-checkbox";


    // Create task text
    const span = document.createElement("span");

    span.textContent = taskText;

    span.className = "task-text";


    // When checkbox is clicked
    checkbox.addEventListener("change", function () {

        if (checkbox.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }

    });


    // Create delete button
    const deleteButton = document.createElement("button");

    //deleteButton.textContent = "🗑";

    deleteButton.className = "delete-button";


    // Delete task
    deleteButton.addEventListener("click", function () {

        li.remove();

    });


    // Put checkbox and text inside left section
    leftSection.appendChild(checkbox);

    leftSection.appendChild(span);


    // Put left section and delete button inside li
    li.appendChild(leftSection);

    li.appendChild(deleteButton);


    // Add task to list
    taskList.appendChild(li);


    // Clear input
    taskInput.value = "";

    // Put cursor back in input
    taskInput.focus();
}


// Add task when Add button is clicked
addButton.addEventListener("click", addTask);


// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});