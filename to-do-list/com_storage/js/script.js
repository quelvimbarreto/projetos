const tarefa = document.getElementById("tarefa");
const tarefaEditar = document.getElementById("tarefa-editar");
const lista = document.getElementById("lista");
const btnAdd = document.getElementById("btn-add");
const btnAtt = document.getElementById("btn-att");
const btnClr = document.getElementById("btn-clr");

let tarefas = [];

//LÊ O LOCAL STORAGE
function ler() {
  lista.innerHTML = "";
  if (localStorage.key("tarefas")) {
    tarefas = JSON.parse(localStorage.getItem("tarefas"));
    tarefas.map((tarefa) => {
      imprimir(tarefa);
    });
  }
}

ler();

//IMPRIME OS DADOS NA TELA
function imprimir(element) {
  const div = document.createElement("div");
  div.classList.add("item");
  div.setAttribute("id", element.id);
  if (element.check === true) {
    div.classList.add("checked");
  }
  div.innerHTML = `
    <i onclick="check(${element.id})" id="icon-${
    element.id
  }" class="item-icon mdi ${
    element.check === true ? "mdi-check-circle-outline" : "mdi-circle-outline"
  }"></i>
    <h2 class="item-text" >${element.tarefa}</h2>
    <div class="item-buttons">
        <button id="btn-edt" class="btn" onclick="editar(${element.id})">
        <i class="mdi mdi-pencil-box-outline"></i></button>
        <button class="btn" onclick="deletar(${element.id})">
        <i class="mdi mdi-delete-circle-outline"></i></button>
    </div>
    `;
  lista.appendChild(div);
}

//CRIA A TAREFA
function criar() {
  const dados = {
    id: tarefas.length + 1,
    tarefa: tarefa.value,
    check: false,
  };

  if (tarefa.value !== "" && tarefa.value !== null && tarefa.value !== undefined) {
    tarefas.push(dados);
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    imprimir(dados);
    limpaCampos();
  } else {
    alert("O campo Tarefa deve ser preenchido!");
  }
}

//LIMPA OS CAMPOS APÓS ENVIAR O FORMULÁRIO
function limpaCampos() {
  tarefa.focus();
  tarefa.value = "";
}

//MARCAR COMO REALIZADA
function check(id) {
  const item = document.getElementById(id);
  const icon = document.getElementById("icon-" + id);
  item.classList.toggle("checked");
  icon.classList.toggle("mdi-circle-outline");
  icon.classList.toggle("mdi-check-circle-outline");
  item.parentNode.appendChild(item);

  index = pegaIndice(id);
  tarefas[index].check === true
    ? (tarefas[index].check = false)
    : (tarefas[index].check = true);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  tarefa.focus();
}

//EDITAR A TAREFA
function editar(id) {
  index = pegaIndice(id);
  tarefaEditar.value = `${tarefas[index].tarefa}`;
  btnAtt.setAttribute("onclick", `confirmarEditar(${id})`);
  btnEdt = document.getElementById("btn-edt");
  btnEdt.setAttribute("disabled", "disabled");
  atualizarBotoes();
}

//CANCELAR EDIÇÃO
function cancelaEditar() {
  tarefa.value = "";
  atualizarBotoes();
  btnEdt.removeAttribute("disabled");
}

//CONFIRMAR EDICAO
function confirmarEditar(id) {
  index = pegaIndice(id);
  tarefas[index].tarefa = tarefaEditar.value;
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  atualizarBotoes();
  ler();
}

//DELETA A TAREFA
function deletar(id) {
  index = pegaIndice(id);
  tarefas.splice(index, 1);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  ler();
}

//ATUALIZA BOTÕES
function atualizarBotoes() {
  btnAdd.classList.toggle("invisivel");
  btnAtt.classList.toggle("invisivel");
  btnClr.classList.toggle("invisivel");
  tarefaEditar.classList.toggle("invisivel");
  tarefa.classList.toggle("invisivel");
}

//PEGA O INDICE DO OBJETO
function pegaIndice(id) {
  return (index = tarefas.map((element) => element.id).indexOf(id));
}
