const addBtn = document.querySelector("button");
const input = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function CheckEmptyList() {
  const filterInput = document.getElementById("filter");
  const clearbtn = document.querySelector("#clear");
  const items = document.querySelectorAll("li");
  items.length !== 0
    ? ((filterInput.style.display = "block"),
      (clearbtn.style.display = "block"))
    : ((filterInput.style.display = "none"), (clearBtn.style.display = "none"));
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    input.value = "";
    alert("no good");
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
  input.value = "";
});

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
  e.target.parentElement.classList.contains("remove-item") &&
    confirm("Are you sure?") &&
    e.target.parentElement.parentElement.remove();

  CheckEmptyList();
});

//clear button
const clearBtn = document.querySelector("#clear");
clearBtn.addEventListener("click", () => {
  //first way
  //   const choppingList = document.querySelectorAll("ul li");
  //   choppingList.forEach((li) => li.remove());

  // second way
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  CheckEmptyList();
});

CheckEmptyList();
