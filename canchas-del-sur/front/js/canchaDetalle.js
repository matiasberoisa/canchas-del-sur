function mostrarHorariosCancha(dia) {
  const horarios = document.getElementById("horarios");
  horarios.innerHTML = "";
  dia.horarios.forEach((h) => {
    const p = document.createElement("p");
    p.textContent = h;
    horarios.appendChild(p);
  });
}
function obtenerParametroURL(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

function renderizarDetalleCancha(cancha) {
  document.getElementById("imagenCancha").src = cancha.imagen;
  document.querySelector("#cancha h2").textContent = cancha.tipo;
  document.querySelector("#ubicacion span").textContent = cancha.ubicacion;
  document.querySelector("#descripcion p").textContent = cancha.descripcion;

  const listadoServicios = document.getElementById("listadoServicios");
  cancha.servicios.forEach((servicio) => {
    const li = document.createElement("li");
    li.innerHTML = `${servicio.icon} ${servicio.nombre}`;
    listadoServicios.appendChild(li);
  });
  const listadoDias = document.getElementById("dias");
  console.log(cancha.diasDisponibles);
  cancha.diasDisponibles.forEach((dia) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "btnDias";
    button.addEventListener("click", () => {
      mostrarHorariosCancha(dia);
    });
    button.textContent = `${dia.fecha} - ${dia.dia}`;
    li.appendChild(button);
    listadoDias.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const id = obtenerParametroURL("id");
  fetch("../utils/data/canchas.json")
    .then((res) => res.json())
    .then((canchas) => {
      const cancha = canchas.find((c) => c.id == id);

      renderizarDetalleCancha(cancha);
    })
    .catch(() => {
      console.log("Error al cargar los datos de la cancha");
    });
});
