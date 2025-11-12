export const cargarPartidos = async (data) => {
  try {
    const response = await fetch(`/api/canchasBusqueda`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`ERROR status: ${response.status}`);
    }
    
    const partidos = await response.json();

    return partidos;
  } catch (error) {
    console.error(error);
    return [];
  }
};
