export function cargarYmostrarCanchas() {
  fetch("/api/canchas/tipos")
    .then((response) => response.json())
    .then((data) => {
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
    img.src = `/api/canchas/download/${t.img}`;
    img.alt = t.nombre;
    img.dataset.original = t.imagen;
    sec.id = "canchaTipo";
    sec.style.cursor = "pointer";
    console.log(t);
    sec.addEventListener("click", () => {
      window.location.href = `vistas/canchasCatalogo.html?tipo=${encodeURIComponent(
        t.nombre
      )}`;
    });

    sec.appendChild(p);
    sec.appendChild(img);
    cont.appendChild(sec);
  });
}
