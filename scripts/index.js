const textInput = document.getElementById("text-input");
const createTodoBtn = document.getElementById("create-todo");
const todoList = document.getElementById("todo-list");
const clearLocalStorage = document.getElementById("clear-ls");
const dataFromLocalStorage = JSON.parse(localStorage.getItem("myTodos"));

// Todo array 
// This array will store values from localStorage
let todoArray = [];


// The renderTodoList function should first render all the todo notes
// from the localStorage using localStorage.getItem("key", "value")
// It has one parameter, which in this case is the todoArray
render = (list) => {

    let listItems = "";

    for(let i = 0; i < list.length; i++) {
        listItems += `
            <div class="container">
                <p>${list[i]}</p>
                <button class="delete-button"> Delete </button>
            </div>
        `
    }

    todoList.innerHTML = listItems;
}



// When clicking the save button
// Call the pushToArray function
// And use the value from input field
createTodoBtn.addEventListener("click", () => {
    if(textInput.value == "") {
        console.log("Please insert a value!");
    } else {
        todoArray.push(textInput.value);
        localStorage.setItem("myTodos", JSON.stringify(todoArray));    // save in localstorage
        textInput.value = "";
        render(todoArray);                                         // render local array
    }
});



clearLocalStorage.addEventListener("dblclick", () => {
    if(JSON.parse(localStorage.getItem("myTodos")) == null) {
        console.log("No elements in localstorage");
    } else {
        console.log("Clearing localstorage");
        localStorage.clear();
        todoArray = [];
        render(todoArray);
    }
});





// Since we are creating buttons using the innerHTML property in the
// renderTodoList, we are not able to initalize the variables before they have been created
// Therefore we add an Event Listener to the todoList variable, and listen for clicks
// if the target (todoList) classList contains ("delete-button")
todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        console.log("Deleted post!");
    }
});



// We need an on-start function that renders all elements
// from localStorage when the client renders on boot.
// It should retrieve all elements from the localStorage
// and render the elements

onBoot = () => {
    if(dataFromLocalStorage == null) {
        console.log("No data found in localStorage")
    } else {
        console.log("Found data in localStorage");
        todoArray = dataFromLocalStorage;
        render(todoArray);
    }
}

onBoot();