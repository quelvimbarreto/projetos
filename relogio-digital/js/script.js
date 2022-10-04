//RELÓGIO
const exibeRelogioHora = document.getElementById("relogio-hora");
const exibeRelogioMinutos = document.getElementById("relogio-minutos");
const exibeRelogioSegundos = document.getElementById("relogio-segundos");

//FUNÇÃO DO RELÓGIO
function relogio() {
  data = new Date();
  relogioHora = data.getHours();
  relogioMinutos = data.getMinutes();
  relogioSegundos = data.getSeconds();
  exibeRelogioHora.innerText =
    relogioHora < 10 ? "0" + relogioHora : relogioHora;
  exibeRelogioMinutos.innerText =
    relogioMinutos < 10 ? "0" + relogioMinutos : relogioMinutos; //ACRESCENTA O ZERO QUANDO O NÚMERO É MENOR QUE 10
  exibeRelogioSegundos.innerText =
    relogioSegundos < 10 ? "0" + relogioSegundos : relogioSegundos; //ACRESCENTA O ZERO QUANDO O NÚMERO É MENOR QUE 10
}

//INICIA O RELÓGIO
setInterval(relogio, 1000);

//=========================================================================================
//CRONÔMETRO
const exibeCronMinutos = document.getElementById("cronometro-minutos");
const exibeCronSegundos = document.getElementById("cronometro-segundos");
const cronIniciar = document.getElementById("cron-iniciar");
const cronParar = document.getElementById("cron-parar");
const cronZerar = document.getElementById("cron-zerar");

//VARIÁVEIS DO CRONÔMETRO
let cronCentSegundos = 0;
let cronSegundos = 0;
let cronMinutos = 0;

//FUNÇÃO DO CRONÔMETRO
function cronometro() {
  cronCentSegundos += 1;
  if (cronCentSegundos === 99) {
    //QUANDO CENTÉSIMOS DE SEGUNDO FOR IGUAL A 99, ZERA OS CENTÉSIMOS DE SEGUNDOS E ACRESCENTA 1 SEGUNDO
    cronCentSegundos = 0;
    cronSegundos += 1;
    if (cronSegundos === 59) {
      //QUANDO SEGUNDOS FOR IGUAL A 59, ZERA OS SEGUNDOS E ACRESCENTA 1 MINUTO
      cronSegundos = 0;
      cronMinutos += 1;
    }
  }

  exibeCronMinutos.innerText =
    cronMinutos < 10 ? "0" + cronMinutos : cronMinutos; //ACRESCENTA O ZERO QUANDO O NÚMERO É MENOR QUE 10
  exibeCronSegundos.innerText =
    cronSegundos < 10 ? "0" + cronSegundos : cronSegundos; //ACRESCENTA O ZERO QUANDO O NÚMERO É MENOR QUE 10
}

//FUNÇÕES DE INICIAR E PARAR O CRONÔMETRO
const iniciarCron = () => {
  cron = setInterval(cronometro, 10);
  cronIniciar.setAttribute("disabled", "disabled");
  cronZerar.setAttribute("disabled", "disabled");
  cronParar.removeAttribute("disabled");
};

const pararCron = () => {
  clearInterval(cron);
  cronIniciar.removeAttribute("disabled");
  cronZerar.removeAttribute("disabled");
  cronParar.setAttribute("disabled", "disabled");
};

//AÇÕES DOS BOTÕES DO CRONÔMETRO
cronIniciar.addEventListener("click", iniciarCron);

cronParar.addEventListener("click", pararCron);

cronZerar.addEventListener("click", () => {
  if (confirm("Tem Ceteza que quer zerar o cronômetro?") === true) {
    cronSegundos = 0;
    cronMinutos = 0;
    exibeCronMinutos.innerText = "00";
    exibeCronSegundos.innerText = "00";
    cronParar.setAttribute("disabled", "disabled");
    cronZerar.setAttribute("disabled", "disabled");
  }
});

//=========================================================================================
//CONTAGEM REGRESSIVA
const exibeReg = document.getElementById("regressiva");
const regIniciar = document.getElementById("regressiva-iniciar");
const regParar = document.getElementById("regressiva-parar");
const regZerar = document.getElementById("regressiva-zerar");
const regTempo = document.getElementById("tempo-minutos");

//VARIÁVEIS DA REGRESSIVA
let regDuracao, regMinutos, regSegundos;

//FUNÇÃO DA REGRESSIVA
function regressiva() {
  if (regDuracao >= 0) {
    regMinutos = parseInt(regDuracao / 60, 10);
    regSegundos = parseInt(regDuracao % 60, 10);
    regMinutos = regMinutos < 10 ? "0" + regMinutos : regMinutos;
    regSegundos = regSegundos < 10 ? "0" + regSegundos : regSegundos;
    --regDuracao;
    exibeReg.innerText = regMinutos + ":" + regSegundos;
  }
}

//FUNÇÕES DE INICIAR E PARAR A REGRESSIVA
const iniciarReg = function() {
  regDuracao = regTempo.value * 60 - 1;
  reg = setInterval(regressiva, 1000);
  regIniciar.setAttribute("disabled", "disabled");
  regParar.removeAttribute("disabled");
};

const pararReg = () => {
  clearInterval(reg);
  regIniciar.removeAttribute("disabled");
  regZerar.removeAttribute("disabled");
  regParar.setAttribute("disabled", "disabled");
};

regIniciar.addEventListener("click", function () {
  regTempo.value ? iniciarReg() : alert("Tempo não definido");
});

regParar.addEventListener("click", pararReg);

regZerar.addEventListener("click", () => {
  if (confirm("Deseja Zerar?") === true) {
    regSegundos = 0;
    regMinutos = 0;
    exibeReg.innerText = "00:00";
    regParar.setAttribute("disabled", "disabled");
    regZerar.setAttribute("disabled", "disabled");
  }
});
