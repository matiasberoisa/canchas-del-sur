function cargarYMostrarCanchas() {
  fetch("../utils/data/tiposCanchasDisponibles.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tiposCanchas = data.map((item) => ({
        id: (item.nombre || item.id || "").replace(/\s+/g, "").toUpperCase(),
        nombre: item.nombre || item.nombre,
        imagen: (item.img || item.imagen || "").replace(/^\.\./, ""),
        clase: (item.nombre || item.id || "").replace(/\s+/g, ""),
      }));
      mostrarTiposCanchas(tiposCanchas);
    })
    .catch((error) => {
      console.error("Error al cargar las canchas:", error);
    });
}
function mostrarTiposCanchas(canchas) {
  const cont = document.querySelector("#canchas");
  if (!cont) return;
  cont.innerHTML = "";
  canchas.forEach((t) => {
    const sec = document.createElement("section");
    sec.id = "canchaTipo";

    sec.innerHTML = `
      <p ">${t.nombre}</p>
      <img src="${t.imagen}" alt="${t.nombre}">
    `;
    cont.appendChild(sec);
  });
}
