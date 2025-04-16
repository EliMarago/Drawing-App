//Selezione degli elementi
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//collegamento dei bottoni
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

//////////////////////////////
//Variabili di stato
let size = 10; // grandezza pennello
let color = "black";
let isPressed = false; //controlla se il mouse è premuto
let x; //posizione del mouse
let y; //posizione del mouse

////// FUNZIONI ///////
//click premuto quando premi il mouse
//1. salva la posizione iniziale (x,y)
//2. dice al programma "sto disegnando" con isPressed = true
canvas.addEventListener("mousedown", function (e) {
  isPressed = true;

  x = e.offsetX;
  y = e.offsetY;
});

//rilascio del click quando lasci il tasto del mouse
// y e x vengono azzerati
canvas.addEventListener("mouseup", function (e) {
  isPressed = false;

  x = undefined;
  y = undefined;
});

//spostamento del mouse quando muovi il mouse mentre premi
//1. prende la posizione del mouse(x2,y2) e disegna lì
//2.aggiorna x e y per il prossimo moviemento
canvas.addEventListener("mousemove", function (e) {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

//Serve per disegnare un punto dove passa il mouse.
function drawCircle(x, y) {
  ctx.beginPath(); //inizia a disegnare una nuova forma
  ctx.arc(x, y, size, 0, Math.PI * 2); // crea un cerchio, centro(x,y) e raggio = size
  ctx.fillStyle = color; // colore interno del cerchio
  ctx.fill(); // riempie il cerchio con il colore
}

//serve per connettere i cerchi creando un tratto continuo
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath(); //inizia a disegnare una nuova linea
  ctx.moveTo(x1, y1); // punto di partenza
  ctx.lineTo(x2, y2); //punto di arrivo
  ctx.strokeStyle = color; // colore della linea
  ctx.lineWidth = size * 2; //spessore della linea
  ctx.stroke(); // disegna la linea
}

//cambia colore aggiorna il colore del pennello
colorEl.addEventListener("change", function (e) {
  color = e.target.value;
});
//aggiorna il numero corrente della dimensione a schermo
function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

//aumenta le dimensioni del pennello tra 5 e 50
increaseBtn.addEventListener("click", function () {
  size += 5;

  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

//diminusce le dimensioni del pennello fino a 5
decreaseBtn.addEventListener("click", function () {
  size -= 5;
  if (size < 5) {
    size = 5;
  }
  updateSizeOnScreen();
});

//pulisci tutto
clearEl.addEventListener("click", function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
