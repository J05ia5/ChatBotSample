async function enviarMensaje() {
    const inputField = document.querySelector("#user-input");
    const textoUsuario = inputField.value.trim();

    if (textoUsuario === "") return;

    // 1. Mostrar mensaje del usuario
    agregarMensaje(textoUsuario, "user-message");
    inputField.value = "";

    // 2. Mostrar "Pensando..."
    const loadingDiv = document.createElement("div");
    loadingDiv.textContent = "Pensando...";
    loadingDiv.id = "loading-msg";
    loadingDiv.style.marginLeft = "20px";
    loadingDiv.style.color = "gray";
    document.getElementById("messages").appendChild(loadingDiv);

    try {
        const respuesta = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: textoUsuario }),
        });

        const datos = await respuesta.json();

        // Quitar "Pensando..."
        document.querySelector("#loading-msg")?.remove();

        // Mostrar respuesta
        agregarMensaje(datos.reply, "bot-message");
    } catch (error) {
        console.error("Error:", error);
        const loadingElement = document.getElementById("loading-msg");
        if (loadingElement) loadingElement.remove();
        agregarMensaje("Error al conectar con el servidor.", "bot-message");
    }
    
}

// Función auxiliar para agregar HTML
function agregarMensaje(texto, clase) {
    const chatBox = document.getElementById("messages");
    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.textContent = texto;
    nuevoMensaje.classList.add("message");
    nuevoMensaje.classList.add(clase);
    chatBox.appendChild(nuevoMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Enter para enviar
window.enviarMensaje = enviarMensaje;

document.querySelector("#chat-container #input-area button").addEventListener("click", () => enviarMensaje());