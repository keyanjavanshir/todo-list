const textInput = document.getElementById("text-input");
const createTodoBtn = document.getElementById("create-todo");
const todoList = document.getElementById("todo-list");
const clearLocalStorage = document.getElementById("clear-ls");


// Todo array 
// This array will be stored in the localStorage
let todoArray = [];

// When clicking the save button
// Call the pushToArray function
// And use the value from input field
createTodoBtn.addEventListener("click", () => {
    if(textInput.value == "") {
        console.log("Please insert a value!");
    } else {
        pushToArray(textInput.value, todoArray);                           // push values to array
        localStorage.setItem("myTodos", `${JSON.stringify(todoArray)}`)    // save in localstorage
        textInput.value = "";
        renderTodoList(todoArray);                                         // render local array
    }
});



clearLocalStorage.addEventListener("dblclick", () => {

    if(JSON.parse(localStorage.getItem("myTodos")) == null) {
        console.log("No elements in localstorage");
    } else {
        console.log("Clearing localstorage")
        localStorage.clear();
        todoArray = [];
        todoList.innerHTML = "";
    }
});


// The pushToArray function takes two parameters
// A string that is equal to the value given from the input field
// A given array, in this case we call the todoArray
// Then it calls the renderTodoList function
// That renders the todo note
pushToArray = (string, array) => {
    todoArray.push(string, ...array); // Use spread operator to append elements onto existing array
};


// The renderTodoList function should first render all the todo notes
// from the localStorage using localStorage.getItem("key", "value")
// It has one parameter, which in this case is the todoArray
renderTodoList = (array) => {

    let innerHTML = "";

    console.log("Function renderTodoList:")
    console.log(array);
 
    for(let i = 0; i < array.length; i++) {
        innerHTML += `
            <div class="container">
                <p>${array[i]}</p>
                <button class="delete-button"> Delete </button>
            </div>
        `
    }

    todoList.innerHTML = innerHTML;

}


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

    let getDataFromLocalStorage = JSON.parse(localStorage.getItem("myTodos"));

    if(getDataFromLocalStorage == null) {
        console.log("No data in localstorage, function onBoot()");
    } else {
        console.log("Found data in localstorage, function onBoot()");
        console.log(getDataFromLocalStorage)

        /*
        todoArray.push(...getDataFromLocalStorage); 
        console.log(`Pushed ${getDataFromLocalStorage} to ${todoArray}`)
        console.log(todoArray)
        */
    }

    // Should not render both arrays
    // Find the correct way to render arrays, which arrays to render?
    // renderTodoList should be refactored
    // how should onBoot be initialized? And which parameters should it use?
    // renderTodoList(todoArray)
    renderTodoList(getDataFromLocalStorage)
}

onBoot();