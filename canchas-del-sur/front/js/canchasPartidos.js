import { cargarPartidos } from "./api/cargarPartidos.js";

let map, lat, lon, currentCircle, currentRadius;
let partidosMarkers = []; // Array para mantener los marcadores de partidos

window.onload = function () {
  if (!navigator.geolocation) {
    alert("Tu navegador no soporta geolocalización");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      lat = pos.coords.latitude;
      lon = pos.coords.longitude;

      map = L.map("map").setView([lat, lon], 14);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
      }).addTo(map);

      L.marker([lat, lon]).addTo(map).bindPopup("Estás aquí").openPopup();

      currentRadius = 100;
      currentCircle = L.circle([lat, lon], {
        radius: currentRadius,
        color: "blue",
        fillColor: "#3f99ff",
        fillOpacity: 0.2,
      }).addTo(map);

      // Event listener para el control de radio
      const area = document.getElementById("kmRadio");
      const areaValue = document.getElementById("areaValue");
      const busqueda = this.document.getElementById("btnBuscarCanchasMapa");
      areaValue.textContent = area.value;
      area.addEventListener("input", () => {
        areaValue.textContent = area.value;
        currentRadius = area.value * 100; // Convertir km a metros

        // Eliminar el círculo anterior si existe
        if (currentCircle) {
          map.removeLayer(currentCircle);
        }

        // Crear nuevo círculo con el radio actualizado
        currentCircle = L.circle([lat, lon], {
          radius: currentRadius,
          color: "blue",
          fillColor: "#3f99ff",
          fillOpacity: 0.2,
        }).addTo(map);
      });

      busqueda.addEventListener("click", async () => {
        try {
          // Limpiar marcadores anteriores
          partidosMarkers.forEach((marker) => map.removeLayer(marker));
          partidosMarkers = [];
          
          const data = {
            lat: lat,
            lon: lon,
            radius: currentRadius
          };
          
          const partidos = await cargarPartidos(data);
          console.log("Partidos recibidos:", partidos);
          
          if (!partidos || partidos.length === 0) {
            alert("No se encontraron partidos en el área seleccionada");
            return;
          }
          
          partidos.forEach((p) => {
            const distancia = map.distance([lat, lon], [p.lat, p.lon]);
            if (distancia <= currentRadius) {
              const popupContent = `
                <div style="
                  width: 220px;
                  padding: 10px;
                  border-radius: 10px;
                  background: #fff;
                  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                  font-family: sans-serif;
                ">
                  <h3 style="margin: 0; font-size: 16px; color: #2a7ae2;">${p.nombre}</h3>
                  <p style="margin: 5px 0;"><strong>Cancha:</strong> ${p.cancha}</p>
                  <p style="margin: 5px 0;"><strong>Integrantes:</strong> ${p.integrantes}/10</p>
                  <p style="margin: 5px 0;"><strong>Horario:</strong> ${p.horario}</p>
                  <button style="
                    background: #2a7ae2;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    padding: 6px 10px;
                    cursor: pointer;
                    margin-top: 6px;
                  ">Unirme</button>
                </div>
              `;

              const marker = L.marker([p.lat, p.lon])
                .addTo(map)
                .bindPopup(popupContent, { maxWidth: 240 });

              partidosMarkers.push(marker); // Guardar referencia al marcador
            }
          });
        } catch (error) {
          console.error("Error al cargar las canchas:", error);
          alert("Error al buscar partidos. Por favor intenta nuevamente.");
        }
      });
    },
    (err) => {
      alert("No se pudo obtener la ubicación: " + err.message);
    }
  );
};
