function cargarYMostrarCanchas() {
  fetch("/api/canchas")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      mostrarTiposCanchas(data);
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
    const img = document.createElement("img");
    const p = document.createElement("p");

    p.textContent = t.nombre;
    img.src = `/api/canchas/download?nombreImg=${t.imagen}`;
    img.alt = t.nombre;
    img.dataset.original = t.imagen;
    sec.id = "canchaTipo";

    sec.appendChild(p);
    sec.appendChild(img);
    cont.appendChild(sec);
  });
}
