function cargarYMostrarCanchas() {
  fetch("/api/canchasInicio")
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
   img.src = t.img;
   img.alt = t.nombre;
   img.dataset.original = t.img;
   sec.id = "canchaTipo";
   
       sec.addEventListener("mouseenter", () => {
      img.src = t.gift;
    });
    sec.addEventListener("mouseleave", () => {
      img.src = t.img;
    });
    sec.appendChild(p);
    sec.appendChild(img);
    cont.appendChild(sec);
  });
}
