//CAMPOS QUE SERÃO ATUALIZADOS=============================
const valor__saida = document.querySelector(".valor__saida");
const valor__entrada = document.querySelector(".valor__entrada");
const valor__saldo = document.querySelector(".valor__saldo");
const saida__registros = document.querySelector(".saida__registros");

//VALORES DO FORMULÁRIO====================================
const entrada__descricao = document.querySelector("#entrada__descricao");
const entrada__valor = document.querySelector("#entrada__valor");
const entrada__tipo = document.querySelector("#entrada__tipo");

//AÇÃO DO BOTÃO
const btn__criar = document.querySelector("#btn__criar");

//CONSTANTE QUE ARMAZENA OS REGISTROS
const registro = [
  {
    id: '15',
    descricao: "Salário do Mês",
    valor: 2500,
    tipo: "entrada",
  },
  {
    id: '16',
    descricao: "Breja Gelada",
    valor: 250,
    tipo: "saida",
  },
  {
    id: '12',
    descricao: "Puta feia",
    valor: 300,
    tipo: "saida",
  },
  {
    id: '19',
    descricao: "Pensão Alimentícia",
    valor: 150,
    tipo: "saida",
  },
];

//CRIA UM REGISTRO =========================================
function criar() {
  if (!entrada__descricao.value) {
    alert("O campo descrição não pode ficar vazio.");
  }
  if (!entrada__valor.value) {
    alert("O campo valor não pode ficar vazio");
  }

  if (isNaN(entrada__valor.value)) {
    alert("O campo valor precisa ser um número.");
  }
  if (!entrada__tipo.value) {
    alert("O campo tipo não pode ficar vazio");
  }
  registro.push({
    id: Math.floor(Date.now() * Math.random()).toString(16),
    descricao: entrada__descricao.value,
    valor: Number(entrada__valor.value),
    tipo: entrada__tipo.value,
  });

  atualiza();
  limpar();
  exibir();
}

btn__criar.addEventListener("click", criar);

//DELETA UM REGISTRO =======================================

function deletar(id) {
  let index = registro.findIndex((elemento) => elemento.id === id);
  registro.splice(index, 1);

  exibir();
  atualiza();
}
//EXIBE OS REGISTROS========================================
window.onload = exibir();

function exibir() {
  let registrosHtml = "";
  registro.map((reg) => {
    registrosHtml += `
    <tr>
      <td>${reg.descricao}</td>
      <td>R$ ${reg.valor.toFixed(2)}</td>
      <td>${
        reg.tipo === "entrada"
          ? '<i class="fa fa-arrow-up" aria-hidden="true"></i>'
          : '<i class="fa fa-arrow-down" aria-hidden="true"></i>'
      }</td>
      <td><i class="fa fa-trash" aria-hidden="true" onclick="deletar('${
        reg.id
      }')"></i></td>
    </tr>
    `;
  });
  saida__registros.innerHTML = registrosHtml;
}

//ATUALIZA OS VALORES=======================================
window.onload = atualiza();

function atualiza() {
  const saidas = registro
    .filter((tipo) => tipo.tipo === "saida")
    .reduce((acum, curr) => acum + curr.valor, 0);

  valor__saida.textContent = `R$ ${saidas.toFixed(2)}`;

  const entradas = registro
    .filter((tipo) => tipo.tipo === "entrada")
    .reduce((acum, curr) => acum + curr.valor, 0);

  valor__entrada.textContent = `R$ ${entradas.toFixed(2)}`;

  const saldo = entradas - saidas;
  valor__saldo.textContent = `R$ ${saldo.toFixed(2)}`;
}

//LIMPA OS CAMPOS ===========================================
function limpar() {
  entrada__descricao.value = "";
  entrada__valor.value = "";
  entrada__tipo.value = "";
}
