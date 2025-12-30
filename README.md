# ChatBot ThreadMap

## Descripción

Proyecto de ejemplo que muestra cómo crear un chatbot sencillo con Node.js. Incluye un servidor local y una interfaz cliente para probar interacciones con una API de inteligencia artificial (en el ejemplo se menciona Google Gemini).

## Requisitos

-   Node.js (descargar desde https://nodejs.org/en/download)

## Instalación y ejecución

1. Abra una terminal y sitúese en la carpeta `server` del proyecto.
2. Instale dependencias (si **no** existe `package.json`):

        npm install express cors dotenv @google/genai

3. Inicie el servidor:

        node ./server.js

Ejemplo (ejecutado desde la carpeta `server`):

<pre>
PS C:\Users\josia\Proyects\ChatBotSample\server> node .\server.js
[dotenv@17.2.3] injecting env (1) from .env -- tip: ⚙️  load multiple .env files with { path: ['.env.local', '.env'] }
Servidor Gemini corriendo en http://localhost:3000
</pre>

Abra la URL indicada (por ejemplo, http://localhost:3000) en su navegador para acceder al cliente.

---

## Variables de entorno

En este ejemplo se usan variables de entorno por seguridad; puede ver cómo añadir una variable de entorno en la documentación de Google:

https://ai.google.dev/gemini-api/docs/api-key?hl=es-419#set-api-env-var

Para pruebas rápidas puede modificar el archivo [.env](server/.env) (siendo esto un ejemplo) y añadir su clave API:

    GEMINI_API_KEY=tu_api_key_aqui

En el código, asegúrese de inicializar el cliente de IA con la variable correspondiente. Por ejemplo, edite [server.js](server/server.js) (siendo esto un ejemplo) y cambie el segmento de configuración por:

    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
    });

Si utiliza otra API (por ejemplo OpenAI), adapte el nombre de la variable y la inicialización según corresponda.

Para obtener una clave de Google Gemini puede visitar:

https://aistudio.google.com/api-keys

> Nota: después de crear o modificar variables de entorno en Windows, abra una nueva sesión de terminal para que las variables estén disponibles.

---

## Problemas comunes y soluciones

-   Error al ejecutar `npm` en PowerShell:

    Mensaje típico:

    > File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.

    Causa: PowerShell bloquea la ejecución de scripts por políticas de seguridad.

    Consulte la documentación sobre políticas de ejecución:

    https://learn.microsoft.com/es-es/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.5

    Solución: abrir PowerShell como usuario actual y ejecutar:

        Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

    Esto permite ejecutar scripts locales firmados o creados por el usuario.

-   Error: "Could not load the default credentials" al iniciar el servidor:

    Mensaje típico al iniciar:

    > Error: Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.

    Causa: la librería de Google no encuentra la clave o las credenciales necesarias, normalmente porque la variable de entorno no está cargada en la sesión actual.


    Solución: asegúrese de definir la variable de entorno (p. ej. `GEMINI_API_KEY`), cierre la sesión de terminal y abra una nueva antes de ejecutar `node server.js`.

---

## Estructura del proyecto

-   `server/` - Código del servidor (`server.js`) y archivo de variables de entorno [.env](server/.env) (siendo esto un ejemplo).
-   `client/` - Interfaz web estática (`index.html`, `pruebas.js`, `style.css`).

---

## Capturas

Las siguientes imágenes muestran la interfaz y el funcionamiento del ejemplo:

![Screenshot 1](https://github.com/user-attachments/assets/e956ecc9-0176-48dd-9609-aed7031da175)
![Screenshot 2](https://github.com/user-attachments/assets/13fcade0-c857-4c72-9a36-d10a924467de)
![Screenshot 3](https://github.com/user-attachments/assets/5fb1b9d2-4e0d-41a8-a256-79a1f3ccb66b)

