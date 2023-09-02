let rows = 80;
let columns = 80;
let lado = 20;

let photo = [];
let reproducir = false;

document.addEventListener("keydown", (e) => {
  //para tener control con el teclado
  e.preventDefault();
  switch (e.key) {
    case "ArrowRight":
      nextState();
      break;
    case " ":
      changeReproduction();
      break;

    default:
      break;
  }
});

setInterval(() => {
  if (reproducir) {
    nextState();
  }
}, 200);

const changeReproduction = () => {
  reproducir = !reproducir;
  if (reproducir) {
    document.body.style.background = "white";
    document.getElementById("btn1").innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    document.body.style.background = "#f0f0ff";
    document.getElementById("btn1").innerHTML = `<i class="fas fa-play"></i>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  generateTable();
});

const generateTable = () => {
  let html = "<table cellpadding=0 cellspacing=0 id='board'>";
  for (let y = 0; y < rows; y++) {
    html += "<tr>";
    for (let x = 0; x < columns; x++) {
      html += `<td id="cell-${
        x + "-" + y
      }" onmouseup="changeState(${x}, ${y})">`;
      html += "</td>";
    }
    html += "</tr>";
  }
  html += "</table>";
  let contenedor = document.getElementById("table-container");
  contenedor.innerHTML = html;
  let tablero = document.getElementById("board");
  tablero.style.width = lado * columns + "px";
  tablero.style.height = lado * columns + "px";
};

const changeState = (x, y) => {
  let cell = document.getElementById(`cell-${x + "-" + y}`);
  if (cell.style.background != "black") {
    cell.style.background = "black";
  } else {
    cell.style.background = "";
  }
};

const clean = () => {
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < columns; y++) {
      let cell = document.getElementById(`cell-${x + "-" + y}`);
      cell.style.background = "";
    }
  }
};

const capture = () => {
  photo = [];
  for (let x = 0; x < columns; x++) {
    photo.push([]);
    for (let y = 0; y < columns; y++) {
      let cell = document.getElementById(`cell-${x + "-" + y}`);
      photo[x][y] = cell.style.background == "black";
    }
  }
};

const countAlives = (x, y) => {
  let alives = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i == 0 && j == 0) continue;
      try {
        if (photo[x + i][y + j]) alives++;
      } catch (error) {}
      if (alives > 3) {
        return alives;
      }
    }
  }
  return alives;
};

const nextState = () => {
  capture();
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < columns; y++) {
      let alives = countAlives(x, y);
      let cell = document.getElementById(`cell-${x + "-" + y}`);
      if (photo[x][y]) {
        //celula esta viva
        if (alives < 2 || alives > 3) cell.style.background = ""; //muere por sobrepoblacion o soledad
      } else {
        if (alives === 3) cell.style.background = "black";
      }
    }
  }
};
