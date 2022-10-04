//cronometro
function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;

  let caralho = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    console.log(minutes + ":" + seconds);
    if (--timer < 0) {
      timer = duration;
    }
    if (timer === 0) {
      console.log("Sem tempo, irmão!");
      clearInterval(caralho);
    }
  }, 1000);
}

var tempo = 5;
startTimer(tempo);

/*
//cronometro
function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    console.log(minutes + ":" + seconds);
    if (++timer < 0) {
      timer = duration;
    }
  }, 1000);
}

var tempo = 0;
startTimer(tempo);*/
