async function crearReserva(data) {
  try {
    const response = await fetch("/api/reservas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const reserva = await response.json();

    if (!response.ok) {
      throw new Error(`ERROR status: ${response.status}`);
    }

    return reserva;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function borrarReserva() {}
