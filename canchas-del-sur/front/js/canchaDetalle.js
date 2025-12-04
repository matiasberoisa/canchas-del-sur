async function crearReserva(idTurno) {
  const idUsuario = localStorage.getItem("userId");

  try {
    const response = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idTurno: idTurno,
        idUsuario: parseInt(idUsuario),
      }),
    });

    if (response.ok) {
      alert("Turno reservado con exito");
      window.location.reload();
    } else {
      alert("Error al reservar turno");
    }
  } catch (error) {
    alert("Error al reservar turno");
  }
}

function mostrarHorariosCancha(dia) {
  console.log(dia);
  const horarios = document.getElementById("horarios");
  horarios.innerHTML = "";
  dia.horarios.forEach(({ id, horarioDesde, horarioHasta }) => {
    const button = document.createElement("button");
    button.textContent = `Reservar: ${horarioDesde} - ${horarioHasta}`;
    button.className = "btn";
    button.addEventListener("click", () => {
      const confirmar = confirm(
        `¿Reservar este turno  ${horarioDesde} - ${horarioHasta}?`
      );
      if (confirmar) {
        crearReserva(id);
      }
    });
    horarios.appendChild(button);
  });
}
function obtenerParametroURL(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

function renderizarDetalleCancha(cancha) {
  document.getElementById(
    "imagenCancha"
  ).src = `/api/canchas/download?nombreImg=${cancha.imagen}`;
  document.querySelector("#cancha h2").textContent = cancha.tipo;
  document.querySelector("#ubicacion span").textContent = cancha.ubicacion;
  document.querySelector("#descripcion p").textContent = cancha.descripcion;

  if (cancha.lat && cancha.lng) {
    const iframe = document.querySelector("#ubicacion iframe");
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=&q=${cancha.lat},${cancha.lng}&zoom=15`;
  }

  const listadoServicios = document.getElementById("listadoServicios");
  cancha.servicios.forEach((servicio) => {
    const li = document.createElement("li");
    li.innerHTML = `${servicio.icon} ${servicio.nombre}`;
    listadoServicios.appendChild(li);
  });
  const listadoDias = document.getElementById("dias");

  cancha.diasDisponibles.forEach((dia) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "btn";
    button.addEventListener("click", () => {
      mostrarHorariosCancha(dia);
    });
    button.textContent = `${dia.fecha} - ${dia.dia}`;
    li.appendChild(button);
    listadoDias.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  try {
    const canchaRes = await fetch(`/api/canchas/byId?id=${id}`);
    const cancha = await canchaRes.json();

    renderizarDetalleCancha(cancha, dias);
  } catch (error) {
    console.log("Error al cargar los datos de la cancha", error);
  }
});
