document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".input-container input");

    // Escuchar la tecla ENTER
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            enviarMensaje();
        }
    });

    // Opcional: Escuchar clic en el botón de enviar (si decides cambiar el icono de voz por uno de enviar)
    document
        .querySelector(".voice-btn")
        .addEventListener("click", enviarMensaje);
});

async function enviarMensaje() {
    const inputField = document.querySelector(
        ".app-container .main-content .input-area .input-container input"
    );
    const textoUsuario = inputField.value.trim();
    const chatView = document.getElementById("chat-view");
    const welcomeView = document.querySelector(".welcome-area");

    if (textoUsuario === "") return;

    // 1. Lógica de Vistas: Si estamos en la bienvenida, ocultarla y mostrar el chat
    if (welcomeView && welcomeView.style.display !== "none") {
        welcomeView.style.display = "none";
        chatView.style.display = "flex"; // O 'block' dependiendo de tu CSS base, en scroll-area es flex
    }

    // 2. Mostrar mensaje del usuario
    agregarMensaje(textoUsuario, "user");
    inputField.value = "";

    // 3. Crear indicador de "Pensando..." con el estilo de la IA
    const loadingId = "loading-" + Date.now();
    mostrarLoading(loadingId);

    try {
        const respuesta = await fetch("http://localhost:3000/chat", {
            // Asegura que la URL sea correcta
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: textoUsuario }),
        });

        if (!respuesta.ok)
            throw new Error("Error en la respuesta del servidor");

        const datos = await respuesta.json();

        // 4. Quitar "Pensando..."
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        // 5. Mostrar respuesta de la IA
        agregarMensaje(datos.reply, "ai");
    } catch (error) {
        console.error("Error:", error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.remove();

        agregarMensaje(
            "Lo siento, hubo un error al conectar con el servidor.",
            "ai"
        );
    }
}

// Función para construir el HTML complejo basado en el diseño
function agregarMensaje(texto, tipo) {
    const chatBox = document.getElementById("chat-view");
    const mensajeDiv = document.createElement("div");

    // Clases base
    mensajeDiv.classList.add("message");

    if (tipo === "user") {
        mensajeDiv.classList.add("user-message");
        // Estructura: <div class="bubble">Texto</div>
        const bubble = document.createElement("div");
        bubble.classList.add("bubble");
        bubble.textContent = texto; // Usar textContent para seguridad
        mensajeDiv.appendChild(bubble);
    } else {
        mensajeDiv.classList.add("ai-message");

        // Estructura del contenido de texto
        const textContent = document.createElement("div");
        textContent.classList.add("text-content");

        // Convertir saltos de línea en párrafos <p>
        // Si tu backend devuelve markdown, aquí podrías usar una librería como 'marked'
        const parrafos = texto.split("\n").filter((line) => line.trim() !== "");
        parrafos.forEach((pText) => {
            const p = document.createElement("p");
            p.textContent = pText;
            textContent.appendChild(p);
        });

        mensajeDiv.appendChild(textContent);

        // Estructura de iconos de acción (Copiar, Like, etc.)
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("message-actions");
        actionsDiv.innerHTML = `
            <i class="fa-regular fa-copy" title="Copiar"></i>
            <i class="fa-regular fa-thumbs-up" title="Me gusta"></i>
            <i class="fa-solid fa-rotate-right" title="Regenerar"></i>
            <i class="fa-solid fa-ellipsis" title="Más"></i>
        `;
        mensajeDiv.appendChild(actionsDiv);
    }

    chatBox.appendChild(mensajeDiv);

    // Auto-scroll al final
    // Nota: Como 'scroll-area' es el contenedor con overflow, hacemos scroll ahí
    chatBox.scrollTop = chatBox.scrollHeight;
}

function mostrarLoading(id) {
    const chatBox = document.getElementById("chat-view");
    const loadingDiv = document.createElement("div");
    loadingDiv.id = id;
    loadingDiv.classList.add("message", "ai-message");

    loadingDiv.innerHTML = `
        <div class="text-content">
            <p><i class="fa-solid fa-circle-notch fa-spin"></i> Pensando...</p>
        </div>
    `;
    chatBox.appendChild(loadingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

/* Enter para enviar
window.enviarMensaje = enviarMensaje;

document
    .querySelector(".app-container .main-content .input-area button")
    .addEventListener("click", () => enviarMensaje());*/