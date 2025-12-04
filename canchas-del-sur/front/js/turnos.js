// Cargar tipos de canchas
async function cargarCanchas() {
  try {
    const response = await fetch("/api/canchas");
    const canchas = await response.json();
    console.log(canchas);
    const select = document.getElementById("tipoCancha");
    select.innerHTML = "";

    canchas.data.forEach((cancha) => {
      const option = document.createElement("option");
      option.value = cancha.id;
      option.textContent = `${cancha.tipo} - ${cancha.nombre}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar los tipos de canchas:", error);
    alert("Error al cargar los tipos de canchas");
  }
}

// Crear turnos
async function crearTurnos(event) {
  event.preventDefault();

  const idCancha = parseInt(document.getElementById("tipoCancha").value);
  const fechaDesde = document.getElementById("fechaDesdeTurno").value;
  const fechaHasta = document.getElementById("fechaHastaTurno").value;
  const horarioDesde = document.getElementById("horaInicioTurno").value;
  const horarioHasta = document.getElementById("horaFinTurno").value;

  // Obtener días seleccionados
  const dias = [];
  const diasMap = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miercoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
  };

  Object.keys(diasMap).forEach((dia) => {
    const checkbox = document.getElementById(dia);
    if (checkbox && checkbox.checked) {
      dias.push(diasMap[dia]);
    }
  });

  if (dias.length === 0) {
    alert("Debe seleccionar al menos un día");
    return;
  }

  const body = {
    idCancha,
    fechaDesde,
    fechaHasta,
    dias,
    horarioDesde,
    horarioHasta,
  };
  console.log(body);
  try {
    const response = await fetch("/api/turnos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const turnos = await response.json();
      alert(`Se crearon ${turnos.length} turnos`);
      event.target.reset();
    } else {
      alert("Error al crear los turnos");
    }
  } catch (error) {
    console.error("Error al crear turnos:", error);
    alert("Error al crear los turnos");
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  cargarCanchas();

  const form = document.querySelector("form");
  form.addEventListener("submit", crearTurnos);
});
