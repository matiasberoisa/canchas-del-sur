// Script para renderizar el detalle de la cancha
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
}

document.addEventListener("DOMContentLoaded", () => {
  const id = obtenerParametroURL("id");
  if (!id) return;
  fetch("../utils/data/canchas.json")
    .then((res) => res.json())
    .then((canchas) => {
      const cancha = canchas.find((c) => c.id == id);

      renderizarDetalleCancha(cancha);
    })
    .catch(() => {});
});
