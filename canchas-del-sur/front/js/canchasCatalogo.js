function cargarCanchasDisponibles() {
  fetch("../utils/data/canchas.json")
    .then((response) => response.json())
    .then((data) => {

      mostrarCanchas(data);
    })
    .catch((error) => {
      console.error("Error al cargar las canchas:", error);
    });
}
function mostrarCanchas(canchas) {
  const canchasContainer = document.getElementById("resultadosCanchas");
  canchasContainer.innerHTML = "";
  canchas.forEach(cancha => {
    canchasContainer.innerHTML += `
      <section id="canchaData">
        <img src="${cancha.imagen}" alt="">
        <p id="canchaNombre">${cancha.tipo}</p>
        <p id="canchaUbicacion">
          <i class="fa-solid fa-location-dot" style="color: gray ; margin-right: 0.3rem;"></i>
          <span>${cancha.ubicacion}</span>
        </p>
        <section id="horarios">
          ${cancha.horarios.map(h => `<p>${h}</p>`).join("")}
        </section>
        <button onclick="location.href='canchaDetalle.html?id=${cancha.id}'">Reservar</button>
      </section>
    `;
  });
}
