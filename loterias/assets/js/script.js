let numMax, numSorteados;

//CRIA A VARIÁVEL QUE ARMAZENA O HISTÓRICO
let jogos = [];

//VARIÁVEIS
function variacao(loteria) {
  if (loteria === "megasena") {
    numMax = 60;
    numSorteados = 6;
    $(".gerador__titulo").text("MEGASENA");
    $(".gerador__titulo").css("color", "#209869");
    $("#gerar").css("background-color", "#209869");
  } else if (loteria === "lotofacil") {
    numMax = 25;
    numSorteados = 15;
    $(".gerador__titulo").text("LOTOFÁCIL");
    $(".gerador__titulo").css("color", "#930089");
    $("#gerar").css("background-color", "#930089");
  }
}

//FUNÇÃO DE GERAR A APOSTA
function geraJogo() {
  //CRIA A VARIÁVEL QUE ARMAZENA OS NÚMEROS ALEATÓRIOS
  let numeros = [];

  //LIMPA AS LISTAS DE NÚMEROS E HISTÓRICO
  $(".gerador__lista").html("");

  //CAPTURA O VALOR DO CAMPO LOTERIA
  const loteria = $("#loteria").val();
  variacao(loteria);

  //GERA OS NÚMEROS ALEATÓRIOS
  while (numeros.length < numSorteados) {
    let sorteado = Math.round(Math.random() * (numMax - 1) + 1);
    if (!numeros.includes(sorteado)) {
      numeros.push(sorteado);
    }
  }

  //ORDENA OS NÚMEROS EM ORDEM CRESCENTE
  numeros.sort((a, b) => a - b);

  //PARA CADA NÚMERO GERADO CRIA UM ITEM NA LISTA E EXIBE NO HTML
  numeros.map((numero) => {
    $(
      `<li class="gerador__lista__numero">${
        numero < 10 ? "0" + numero : numero
      }</li>`
    ).appendTo(".gerador__lista");
  });

  //ADICIONA O JOGO GERADO AO HISTÓRICO
  jogos.push(numeros);

  //CHAMA O HISTÓRICO
  geraHistorico();
}

//CRIA O HISTÓRICO DE APOSTAS
function geraHistorico() {
  //PEGA O ÍNDICE DO ÚLTIMO JOGO
  const ultimoJogo = jogos[jogos.length - 1];

  //IMPRIME O HISTÓRICO NO HTML
  $(`
  <li class="historico__jogos__item">
    <ul class="numeros">
      ${ultimoJogo
        .map((num) => {
          return `<li class="numero">${num < 10 ? "0" + num : num}</li>`;
        })
        .join("")}
    </ul>
  </li>
  `).appendTo(".historico__jogos");
}

//LIMPA O CAMPO HISTÓRICO
function limpar() {
  jogos = [];
  $(".historico__jogos").empty();
}

//FUNÇÃO DE CLIQUE DO BOTÃO
$("#gerar").on("click", geraJogo);
$("#limpar").on("click", limpar);
$("#loteria").change(variacao);
