const contenedor = document.getElementById("canchas");
const tiposCanchas = [
  {
    nombre: "Futbol 5",
    jugadores: [
      { top: 30, left: 60 },
      { bottom: 30, left: 60 },
      { top: 30, right: 60 },
      { bottom: 30, right: 60 },
      { left: 0, right: 0, top: 0, bottom: 0, margin: "auto" },
    ],
  },
  {
    nombre: "Futbol 8",
    jugadores: [
      { top: 30, left: 60 },
      { bottom: 30, left: 60 },
      { top: 30, right: 60 },
      { bottom: 30, right: 60 },
      {  margin: "0 auto"},
      { left: 0, right: 0, top: 0, bottom: 0, margin: "auto" },
    ],
  },
];

function crearCancha(canchaData) {
  const canchaDiv = document.createElement("div");
  canchaDiv.classList.add("cancha");
  canchaData.jugadores.forEach((pos) => {
    const jugador = document.createElement("div");
    jugador.classList.add("jugador");
    jugador.style.top = pos.top + "px";
    jugador.style.left = pos.left + "px";
    jugador.style.bottom = pos.bottom + "px";
    jugador.style.right = pos.right + "px";
    if (pos.margin) jugador.style.margin = pos.margin;
    canchaDiv.appendChild(jugador);
  });
  const pelota = document.createElement("div");
  pelota.classList.add("pelota");
  canchaDiv.appendChild(pelota);

  inicializarAnimacion(canchaDiv);
  return canchaDiv;
}

function inicializarAnimacion(cancha) {
  const pelota = cancha.querySelector(".pelota");
  const jugadores = cancha.querySelectorAll(".jugador");
  let index = 0;
  let intervalo;

  function moverPelota() {
    const jugador = jugadores[index];
    const x =
      jugador.offsetLeft + jugador.offsetWidth / 2 - pelota.offsetWidth / 2;
    const y =
      jugador.offsetTop + jugador.offsetHeight / 2 - pelota.offsetHeight / 2;
    pelota.style.transform = `translate(${x}px, ${y}px)`;
    index = (index + 1) % jugadores.length;
  }

  cancha.addEventListener("mouseenter", () => {
    moverPelota();
    intervalo = setInterval(moverPelota, 1000);
  });

  cancha.addEventListener("mouseleave", () => {
    clearInterval(intervalo);
  });
}

tiposCanchas.forEach((data) => {
  const cancha = crearCancha(data);
  contenedor.appendChild(cancha);
});
