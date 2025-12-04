export async function cargarReservasUsuario(userId) {
  try {
    const response = await fetch(`/api/reservas/byUsuario/${userId}`);

    if (!response.ok) {
      throw new Error("Error al cargar las reservas");
    }

    const reservas = await response.json();
    const container = document.getElementById("misReservas");

    if (!reservas || reservas.length === 0) {
      container.innerHTML = "<p>No tienes reservas registradas.</p>";
      return;
    }

    container.innerHTML = "";

    for (const reserva of reservas) {
      const reservaCard = document.createElement("div");
      reservaCard.innerHTML = `
        <div id="reservaData">
          <img src="/api/canchas/download/${
            reserva.turno.cancha.imagen
          }" alt="${reserva.turno.cancha.nombre}">
          <div>
            <h3 id="reservaNombre">${reserva.turno.cancha.nombre}</h3>
            <p id="reservaUbicacion"><strong>Ubicación:</strong> ${reserva.turno.cancha.ubicacion}</p>
            <p><strong>Fecha:</strong> ${new Date(
              reserva.turno.fecha
            ).toLocaleDateString("es-ES")}</p>
            <p><strong>Horario:</strong> ${reserva.turno.horarioDesde} - ${
        reserva.turno.horarioHasta
      }</p>
          </div>
       
        <button class="btn-cancelar" data-reserva-id="${
          reserva.id
        }">Cancelar Reserva</button> </div>
      `;

      container.appendChild(reservaCard);
    }

    document.querySelectorAll(".btn-cancelar").forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        const reservaId = e.target.dataset.reservaId;
        const confirmar = confirm(
          "Cancelar esta reserva"
        );

        if (confirmar) {
          await cancelarReserva(reservaId);
        }
      });
    });
  } catch (error) {
    console.error("Error al cargar reservas:", error);
    document.getElementById("misReservas").innerHTML =
      "<p>Error al cargar las reservas.</p>";
  }
}

async function cancelarReserva(reservaId) {
  try {
    const response = await fetch(`/api/reservas/${reservaId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Reserva cancelada");
      window.location.reload();
    } else {
      alert("Error al cancelar la reserva");
    }
  } catch (error) {
    
    alert("Error al cancelar la reserva");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    cargarReservasUsuario(parseInt(userId));
  }
});
