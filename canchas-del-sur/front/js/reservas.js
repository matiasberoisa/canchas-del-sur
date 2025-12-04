export function cargarReservasUsuario(idUsuario) {
  fetch(`http://localhost:3000/reservas/byUsuario/${idUsuario}`).then(
    then((response) => response.json())
      .then((data) => mostrarReservas(data))
      .catch((error) => {
        alert("Error al cargar las canchas:", error);
      })
  );
}
function mostrarReservas(reservas) {
  const reservasContainer = document.getElementById("misReservas");
  reservasContainer.innerHTML = "";
  if (!reservas || reservas.length === 0) {
    reservasContainer.innerHTML =
      '<p style="text-align: center; width: 100%; padding: 2rem;">No se encontraron reservas activas</p>';
    return;
  }
}
reservas.forEach((reserva) => {
  reservasContainer.innerHTML += `
      <section id="canchaData">
        <p id="canchaNombre">${reserva.turno.cancha.nombre}</p>
        <p id="canchaUbicacion">
          <i class="fa-solid fa-location-dot" style="color: gray ; margin-right: 0.3rem;"></i>
          <span>${reserva.turno.cancha.ubicacion}</span>
          <span>${reserva.turno.horarioDesde} - ${reserva.turno.horarioHasta}</span>
        </p>

        <button onclick="location.href='canchaDetalle.html?id=${cancha.id}'">Cancelar reserva</button>
        
      </section>
    `;
});
