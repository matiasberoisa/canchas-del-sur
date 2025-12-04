export function cargarCanchasDisponibles() {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoFiltro = urlParams.get("tipo");
  const searchFiltro = urlParams.get("search");
  const pageParam = urlParams.get("page") || 1;

  cargarTiposCanchas(tipoFiltro);

  const inputBuscar = document.getElementById("inputBuscar");
  if (inputBuscar && searchFiltro) {
    inputBuscar.value = searchFiltro;
  }

  const params = new URLSearchParams();
  if (tipoFiltro) params.append("tipo", tipoFiltro);
  if (searchFiltro) params.append("search", searchFiltro);
  params.append("page", pageParam);
  params.append("limit", 8);

  fetch(`/api/canchas?${params.toString()}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      mostrarCanchas(data.data);
      mostrarPaginacion(data.pagination, tipoFiltro, searchFiltro);
    })
    .catch((error) => {
      alert("Error al cargar las canchas:", error);
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
        <img src="/api/canchas/download/${cancha.imagen}" alt="">
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

function mostrarPaginacion(pagination, tipo, search) {
  let paginacionContainer = document.getElementById("paginacion");

  if (!paginacionContainer) {
    paginacionContainer = document.createElement("div");
    paginacionContainer.id = "paginacion";
    document.querySelector("main").appendChild(paginacionContainer);
  }

  paginacionContainer.innerHTML = "";

  if (!pagination || pagination.totalPages <= 1) {
    return;
  }

  const { currentPage, totalPages } = pagination;

  const nav = document.createElement("nav");
  nav.className = "pagination";

  if (currentPage > 1) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "‹ Anterior";
    prevBtn.onclick = () => cambiarPagina(currentPage - 1, tipo, search);
    nav.appendChild(prevBtn);
  }

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.className = i === currentPage ? "active" : "";
      pageBtn.onclick = () => cambiarPagina(i, tipo, search);
      nav.appendChild(pageBtn);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.className = "dots";
      nav.appendChild(dots);
    }
  }

  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Siguiente ›";
    nextBtn.onclick = () => cambiarPagina(currentPage + 1, tipo, search);
    nav.appendChild(nextBtn);
  }

  paginacionContainer.appendChild(nav);
}

function cambiarPagina(page, tipo, search) {
  const params = new URLSearchParams();
  if (tipo) params.append("tipo", tipo);
  if (search) params.append("search", search);
  params.append("page", page);

  window.location.href = `canchasCatalogo.html?${params.toString()}`;
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
