function cargarCanchas() {
    console.log("Cargando canchas disponibles...");
  fetch("../utils/data/seleccionInicial.json")
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
    const section = document.createElement("section");
    section.className = `${cancha.tipo} services`;
    section.style.backgroundImage = `url('${cancha.imagen}')`
    section.innerHTML = `
        <p class="service-text">${cancha.nombre}</p>
    `;
    if (cancha.imagenHover) {
    section.addEventListener("mouseenter", () => {
        section.style.backgroundImage = `url('${cancha.imagenHover}')`;
        section.style.transform = "scale(1.05)";
    });
    section.addEventListener("mouseleave", () => {
        section.style.backgroundImage = `url('${cancha.imagen}')`;
        section.style.transform = "scale(1)";
    });
}
    seleccionContainer.appendChild(section);
  });
}