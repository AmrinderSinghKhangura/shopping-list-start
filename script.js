const addBtn = document.querySelector("button");
const input = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

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

  input.value = "";
});
