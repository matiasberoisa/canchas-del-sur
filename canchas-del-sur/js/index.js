function cargarCanchas() {
    console.log("Cargando canchas disponibles...");
  fetch("/canchas-del-sur/utils/data/seleccionInicial.json")
    .then((response) => response.json())
    .then((data) => {
      mostrarCanchas(data);
    })
    .catch((error) => {
      console.error("Error al cargar las canchas:", error);
    });
}
function mostrarCanchas(canchas) {
  const seleccionContainer = document.getElementById("seleccionInicial");
  seleccionContainer.innerHTML = "";
  canchas.forEach(cancha => {
    seleccionContainer.innerHTML += `
    <section class="${cancha.tipo} services">
        <p class="service-text">${cancha.nombre}</p>
    </section>
    `;
  });
}