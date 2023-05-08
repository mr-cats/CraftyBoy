const app = {
  data: [], // Placeholder for your item data

  init() {
  // Load the item database and store it in the 'data' property
  getDatabaseRef().on('value', (snapshot) => {
    this.data = snapshot.val() || [];
  });

    // Add an event listener for the search input
    document.getElementById("search-input").addEventListener("input", this.searchItems);
	document.getElementById("item-form").addEventListener("submit", this.addItem);
	
  },
  
  addItem(event) {
    event.preventDefault();

    // Get the input values from the form
    const itemName = document.getElementById("item-name").value.trim();
    const itemDescription = document.getElementById("item-description").value.trim();

    // Create a new item object
    const newItem = {
      name: itemName,
      description: itemDescription,
      // Add other item properties as needed
    };

    // Add the new item to the data array
    this.data.push(newItem);

  // Add the new item to the Firebase Realtime Database
  const newItemRef = getDatabaseRef().push();
  newItem.id = newItemRef.key;
  newItemRef.set(newItem);

    // Reset the form
    event.target.reset();
  },


  searchItems(event) {
    const searchString = event.target.value.toLowerCase(); // Get the user input
    const maxResults = 10; // Set the maximum number of search results

    // Filter the data based on the search string in the item's name or description
    const results = this.data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.description.toLowerCase().includes(searchString)
      );
    }).slice(0, maxResults);

    // Display the search results
    this.displayResults(results);
  },

  displayResults(results) {
    const searchResultsContainer = document.getElementById("search-results");
    searchResultsContainer.innerHTML = ""; // Clear previous search results

    // Create and display a new element for each search result
    results.forEach((result) => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("search-result-item");
      resultItem.innerHTML = `<h4>${result.name}</h4><p>${result.description}</p>`;
      searchResultsContainer.appendChild(resultItem);
    });
	
    // Add a click event listener to each search result item
	searchResultsContainer.querySelectorAll(".search-result-item").forEach((resultItem) => {
      resultItem.addEventListener("click", (event) => {
        this.addToTodoList(result);
      });
    });
  },
  
  addToTodoList(item) {
    const todoList = document.getElementById("todo-items");

    // Check if the item is already in the "todo" list
    if (Array.from(todoList.children).some((todoItem) => todoItem.dataset.itemId === item.id)) {
      alert("This item is already in the todo list.");
      return;
    }

    // Create a new list item for the "todo" list
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.dataset.itemId = item.id;
    todoItem.textContent = item.name;

    // Add the new "todo" list item to the list
    todoList.appendChild(todoItem);
  },
};

function getDatabaseRef() {
  return firebase.database().ref('items');
}

app.init();