export function cargarCanchasDisponibles() {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoFiltro = urlParams.get("tipo");
  const searchFiltro = urlParams.get("search");
  
  cargarTiposCanchas(tipoFiltro);
  
  // Restaurar valor del input de búsqueda
  const inputBuscar = document.getElementById("inputBuscar");
  if (inputBuscar && searchFiltro) {
    inputBuscar.value = searchFiltro;
  }
  
  const params = new URLSearchParams();
  if (tipoFiltro) params.append("tipo", tipoFiltro);
  if (searchFiltro) params.append("search", searchFiltro);

  fetch(`/api/canchas?${params.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      mostrarCanchas(data.data);
    })
    .catch((error) => {
      console.error("Error al cargar las canchas:", error);
    });
}

function cargarTiposCanchas(tipoSeleccionado) {
  fetch("/api/canchas/tipos")
    .then((response) => response.json())
    .then((tipos) => {
      const selectTipo = document.getElementById("selectTipo");

      selectTipo.innerHTML =
        '<option value="">Seleccionar tipo de cancha</option>';

      tipos.forEach((tipo) => {
        const option = document.createElement("option");
        option.value = tipo.nombre;
        option.textContent = tipo.nombre;

        if (tipoSeleccionado && tipo.nombre === tipoSeleccionado) {
          option.selected = true;
        }

        selectTipo.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error al cargar tipos de canchas:", error);
    });
}

function mostrarCanchas(canchas) {
  const canchasContainer = document.getElementById("resultadosCanchas");
  canchasContainer.innerHTML = "";

  if (!canchas || canchas.length === 0) {
    canchasContainer.innerHTML =
      '<p style="text-align: center; width: 100%; padding: 2rem;">No se encontraron canchas disponibles</p>';
    return;
  }

  canchas.forEach((cancha) => {
    canchasContainer.innerHTML += `
      <section id="canchaData">
        <img src="/api/canchas/download?nombreImg=${cancha.imagen}" alt="">
        <p id="canchaNombre">${cancha.nombre}</p>
        <p id="canchaUbicacion">
          <i class="fa-solid fa-location-dot" style="color: gray ; margin-right: 0.3rem;"></i>
          <span>${cancha.ubicacion}</span>
        </p>

        <button onclick="location.href='canchaDetalle.html?id=${cancha.id}'">Reservar</button>
      </section>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const formBuscar = document.getElementById("formBuscar");

  if (formBuscar) {
    formBuscar.addEventListener("submit", (e) => {
      e.preventDefault();
      const tipo = document.getElementById("selectTipo").value;
      const busqueda = document.getElementById("inputBuscar").value;

      const params = new URLSearchParams();
      if (tipo) params.append("tipo", tipo);
      if (busqueda) params.append("search", busqueda);

      window.location.href = `canchasCatalogo.html?${params.toString()}`;
    });
  }
});
