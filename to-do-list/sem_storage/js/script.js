const text = document.getElementById("text");
const addButton = document.getElementById("add");
const list = document.getElementById("list");

let cont = 0;

function add() {
  cont++;
  list.innerHTML += `
        <div id="${cont}" class="item">
            <i onclick="check(${cont})" id="icon-${cont}" class="item-icon mdi mdi-circle-outline"></i>
            <p onclick="check(${cont})" class="item-text">${text.value}</p>
            <button onclick="remove(${cont})" class="btn item-button">
                <i class="mdi mdi-delete-outline"></i> 
            </button>
          </div>
  `;
  text.focus();
  text.value = "";
}

function check(id) {
  const item = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);
  item.classList.toggle("checked");
  icon.classList.toggle("mdi-circle-outline");
  icon.classList.toggle("mdi-check-circle-outline");
  item.parentNode.appendChild(item);
  text.focus();
}

function remove(id) {
  const item = document.getElementById(id);
  item.remove();
}

text.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    add();
  }
});
