const addBtn = document.querySelector("button");
const input = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
let editMode = false;

function CheckEmptyList() {
  const filterInput = document.getElementById("filter");
  const clearbtn = document.querySelector("#clear");
  const items = document.querySelectorAll("li");
  items.length !== 0
    ? ((filterInput.style.display = "block"),
      (clearbtn.style.display = "block"))
    : ((filterInput.style.display = "none"), (clearBtn.style.display = "none"));
}

function addToLocalStorage(item) {
  let itemArray;
  localStorage.getItem("items") === null
    ? (itemArray = [])
    : (itemArray = JSON.parse(localStorage.getItem("items")));

  itemArray.push(item);
  localStorage.setItem("items", JSON.stringify(itemArray));
}

function RetrieveFromLocalStorage() {
  let itemArray = [];
  localStorage.getItem("items") !== null &&
    (itemArray = JSON.parse(localStorage.getItem("items")));
  itemArray.length > 0 &&
    itemArray.forEach((item) => {
      const newLiItem = document.createElement("li");
      newLiItem.appendChild(document.createTextNode(item));

      const delBtn = document.createElement("button");
      delBtn.className = "remove-item btn-link text-red";

      const i = document.createElement("i");
      i.className = "fa-solid fa-xmark";

      delBtn.appendChild(i);
      newLiItem.appendChild(delBtn);
      itemList.appendChild(newLiItem);
    });
}

function deleteFromStorage(itemToDelete) {
  let itemArray;
  localStorage.getItem("items") !== null &&
    (itemArray = JSON.parse(localStorage.getItem("items")));

  itemArray = itemArray.filter((item) => item !== itemToDelete);
  localStorage.setItem("items", JSON.stringify(itemArray));
}
function checkIfItemExists(item) {
  if (localStorage.getItem("items") === null) {
    return false;
  }
  return JSON.parse(localStorage.getItem("items")).includes(item.toLowerCase());
}

const addButtonClicked = (e) => {
  e.preventDefault();
  if (editMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    deleteFromStorage(itemToEdit.textContent);
    itemList.removeChild(itemToEdit);
    editMode = false;
    addBtn.style.backgroundColor = "black";
    addBtn.textContent = "Add Item";
  }
  if (input.value.trim() === "") {
    input.value = "";
    alert("no good");
    return;
  }
  if (checkIfItemExists(input.value)) {
    alert("Item already exists");
    input.value = "";
    return;
  }
  const newLiItem = document.createElement("li");
  newLiItem.appendChild(document.createTextNode(input.value));

  const delBtn = document.createElement("button");
  delBtn.className = "remove-item btn-link text-red";

  const i = document.createElement("i");
  i.className = "fa-solid fa-xmark";

  delBtn.appendChild(i);
  newLiItem.appendChild(delBtn);
  itemList.appendChild(newLiItem);
  CheckEmptyList();
  addToLocalStorage(input.value);
  input.value = "";
};

//FIRST WAY TO REMOVE
// const ulButtons = document.querySelectorAll("ul button");
// ulButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const listItem = button.parentElement;
//     listItem.remove();
//   });
//   CheckEmptyList();
// });

//Second way to remove
itemList.addEventListener("click", function (e) {
  //deletes item in list
  e.target.parentElement.classList.contains("remove-item") &&
    confirm("Are you sure?") &&
    e.target.parentElement.parentElement.remove();
  deleteFromStorage(e.target.parentElement.parentElement.textContent);
  CheckEmptyList();
});

//clear button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
  //first way
  //   const choppingList = document.querySelectorAll("ul li");
  //   choppingList.forEach((li) => li.remove());

  // second way
  if (confirm("Are you sure you want to clear the shopping list?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");
  }

  CheckEmptyList();
});

const filterInput = document.querySelector("#filter");
filterInput.addEventListener("keyup", function (e) {
  const items = document.querySelectorAll("#item-list li");

  items.forEach((item) => {
    item.textContent.toLowerCase().indexOf(filterInput.value.toLowerCase()) ===
    -1
      ? (item.style.display = "none")
      : (item.style.display = "flex");
  });
});

itemList.addEventListener("click", (e) => {
  if (
    e.target.id !== "item-list" &&
    !e.target.parentElement.classList.contains("remove-item")
  ) {
    itemList
      .querySelectorAll(".edit-mode")
      .forEach((item) => item.classList.remove("edit-mode"));

    editMode = true;
    e.target.classList.add("edit-mode");
    addBtn.innerHTML = "<i /> Edit";
    addBtn.style.backgroundColor = "green";
    input.value = e.target.textContent;
  }
});

function init() {
  //event handlers
  addBtn.addEventListener("click", addButtonClicked);
  RetrieveFromLocalStorage();
  CheckEmptyList();
}

init();
