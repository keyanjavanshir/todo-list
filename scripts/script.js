const textInput = document.getElementById("text-input");
const createTodoBtn = document.getElementById("create-todo");
const todoList = document.getElementById("todo-list");


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
        pushToArray(textInput.value, todoArray); 
        localStorage.setItem("myTodos", `${JSON.stringify(todoArray)}`)
        textInput.value = "";
    }
});

// The pushToArray function takes two parameters
// A string that is equal to the value given from the input field
// A given array, in this case we call the todoArray
// Then it calls the renderTodoList function
// That renders the todo note
pushToArray = (string, array) => {
    todoArray.push(string);
    renderTodoList(array);
};


// The renderTodoList function should first render all the todo notes
// from the localStorage using localStorage.getItem("key", "value")
// It has one parameter, which in this case is the todoArray
renderTodoList = (array) => {

    innerHTML = "";
 
    for(let i = 0; i < array.length; i++) {
        innerHTML = `
            <div class="container">
                <p>${array[i]}</p>
                <button class="delete-button"> Delete </button>
            </div>
        `
    }

    todoList.innerHTML += innerHTML;

}


// Since we are creating buttons using the innerHTML property in the
// renderTodoList, we are not able to initalize the variables before they have been created
// Therefore we add an Event Listener to the todoList variable, and listen for clicks
// if the target (todoList) classList contains ("delete-button")
todoList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
        console.log("Deleted post!");
        localStorage.clear();
    }
});



// We need an on-start function that renders all elements
// from localStorage when the client renders on boot.
// It should retrieve all elements from the localStorage
// and render the elements

onBoot = () => {
    let storageArray = JSON.parse(localStorage.getItem("myTodos"));

    console.log(storageArray[0]);

    // Should not render both arrays
    // Find the correct way to render arrays, which arrays to render?
    // renderTodoList should be refactored
    // how should onBoot be initialized? And which parameters should it use?
    renderTodoList(todoArray)
    renderTodoList(storageArray);
}

onBoot();