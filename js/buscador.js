const inputBuscador = document.getElementById("buscador");
const juegos = [...juegosnes, ...juegossnes, ...juegosgenesis];

inputBuscador.addEventListener("input", () => {
  const texto = inputBuscador.value.toLowerCase();

  // Buscar el contenedor o crearlo si no existe
  let resultados = document.getElementById("resultados");
  if (!resultados) {
    resultados = document.createElement("ul");
    resultados.id = "resultados";
    resultados.style.marginTop = "10px"; // pequeño espacio visual
    resultados.style.listStyle = "none";
    resultados.style.width = "50%";
    resultados.style.background = "#1c1c1c";
    resultados.style.border = "1px solid #444";
    resultados.style.borderRadius = "8px";
    resultados.style.padding = "0";
    inputBuscador.parentElement.appendChild(resultados);
  }

  // Limpiar resultados anteriores
  resultados.innerHTML = "";

  // Si el input está vacío, eliminar resultados y salir
  if (texto === "") {
    resultados.remove();
    return;
  }

  const coincidencias = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(texto)
  );

  console.log("Coincidencias encontradas:", coincidencias);

  // Si no hay coincidencias, también se elimina el contenedor
  if (coincidencias.length === 0) {
    resultados.remove();
    return;
  }

  // Mostrar resultados
  coincidencias.forEach((juego) => {
    const item = document.createElement("li");
    item.textContent = juego.nombre;

    item.style.padding = "10px";
    item.style.borderBottom = "1px solid #333";
    item.style.cursor = "pointer";

    item.addEventListener("click", () => mostrarModal(juego));

    resultados.appendChild(item);
  });
});

// Función para el paso siguiente
function mostrarModal(juego) {
  console.log("Juego seleccionado:", juego);
  // Próximo paso: mostrar ventana emergente con info del juego
}

function mostrarModal(juego) {
  // Si ya existe un modal abierto, lo eliminamos
  const modalExistente = document.getElementById("modal-juego");
  if (modalExistente) modalExistente.remove();

  const modal = document.createElement("div");
  modal.id = "modal-juego";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  const contenido = document.createElement("div");
  contenido.style.background = "#111";
  contenido.style.padding = "20px";
  contenido.style.borderRadius = "10px";
  contenido.style.textAlign = "center";
  contenido.style.color = "#eee";
  contenido.style.maxWidth = "400px";
  contenido.style.boxShadow = "0 0 20px #000";

  contenido.innerHTML = `
    <h2>${juego.nombre}</h2>
    <p>Plataforma: ${juego.plataforma}</p>
    <img src="${juego.imagen}" alt="${juego.nombre}" style="max-width:100%; border-radius: 6px; margin: 10px 0;">
    <br>
    <a href="${juego.descarga}" target="_blank" style="display:inline-block; margin-top:10px; padding:10px 20px; background:#007bff; color:white; border-radius:6px; text-decoration:none;">Descargar</a>
    <br><br>
    <button id="cerrar-modal" style="margin-top: 10px; padding: 8px 16px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer;">Cerrar</button>
  `;

  modal.appendChild(contenido);
  document.body.appendChild(modal);

  // Evento para cerrar el modal
  document.getElementById("cerrar-modal").addEventListener("click", () => {
    modal.remove();
  });

  // Cerrar si se hace clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
