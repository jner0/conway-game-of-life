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

const initializeSpaceshipPattern = () => {
  clean();
  // Coordenadas iniciales de las naves espaciales
  const spaceshipCoordinates = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
    { x: 12, y: 9 },
    { x: 11, y: 8 },
  ];

  // Establece las celdas iniciales como vivas
  spaceshipCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
};

const initializeOscillatorPattern = () => {
  clean();
  // Coordenadas iniciales del oscilador (ejemplo de un oscilador "parpadeante")
  const oscillatorCoordinates = [
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 12, y: 10 },
  ];

  const beaconCoordinates = [
    { x: 15, y: 15 },
    { x: 15, y: 16 },
    { x: 16, y: 15 },
    { x: 16, y: 16 },
    { x: 17, y: 17 },
    { x: 17, y: 18 },
    { x: 18, y: 17 },
    { x: 18, y: 18 },
  ];

  const toadCoordinates = [
    { x: 23, y: 23 },
    { x: 24, y: 23 },
    { x: 25, y: 23 },
    { x: 22, y: 24 },
    { x: 23, y: 24 },
    { x: 24, y: 24 },
  ];

  // Establece las celdas iniciales como vivas
  oscillatorCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
  beaconCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
  toadCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
};

const initializeStillLifePattern = () => {
  clean();
  // Coordenadas iniciales del patrón "Loaf"

  const tubCoordinates = [
    { x: 10, y: 10 },
    { x: 9, y: 11 },
    { x: 11, y: 11 },
    { x: 10, y: 12 },
  ];

  const beehiveCoordinates = [
    { x: 15, y: 15 },
    { x: 16, y: 15 },
    { x: 14, y: 16 },
    { x: 17, y: 16 },
    { x: 15, y: 17 },
    { x: 16, y: 17 },
  ];

  const boatCoordinates = [
    { x: 20, y: 20 },
    { x: 21, y: 20 },
    { x: 20, y: 21 },
    { x: 22, y: 21 },
    { x: 21, y: 22 },
  ];

  // Establece las celdas iniciales como vivas
  tubCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
  beehiveCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
  boatCoordinates.forEach((coord) => {
    const cell = document.getElementById(`cell-${coord.x + "-" + coord.y}`);
    cell.style.background = "black";
  });
};
